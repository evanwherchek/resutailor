"""The backend service that parses job listings and edits .docx files"""

import os
from flask import Flask, request, abort, send_file
import validators
import requests
from bs4 import BeautifulSoup
from openai import OpenAI, _exceptions
from dotenv import load_dotenv
from docx import Document
from flask_cors import CORS
import docxedit
import json

PROMPT = ("Given the text from a job description, "
          "extract the skills exactly as they appear. "
          "Limit each result to 1-2 words. "
          "Provide the response as a JSON object with the following format: "
          "{\"skills\": []} Do not say anything else in your response. "
          "The job description will begin after the 'BEGIN DESCRIPTION:'. BEGIN DESCRIPTION: ")

app = Flask(__name__)
CORS(app)

@app.route('/parseSkills', methods=['GET'])
def parse_skills():
    """Takes the job listing URL, extracts the skills from it, and returns a list"""
    url = request.args.get('postingUrl', 'missing')

    load_dotenv()

    client = OpenAI(
        api_key=os.getenv('OPENAI_API_KEY')
    )

    if validators.url(url):
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')

        if soup.get_text() == '':
            abort(422) # Unprocessable content

        try:
            completion = client.chat.completions.create(
            temperature = 0.2,
            model = 'gpt-4',
            timeout = 10,
            messages = [
                    {
                        'role': 'user',
                        'content': PROMPT + soup.get_text()
                    }
                ]
            )

            return completion.choices[0].message.content
        except _exceptions.RateLimitError as e:
            abort(413) # Context window exceeded
        except _exceptions.APITimeoutError as e:
            abort(408) # OpenAI timeout
    else:
        abort(400)

@app.route('/appendSkills', methods=['POST'])
def append_skills():
    file_name = 'ResumeTemplate.docx'
    skills = request.get_json().get('skills', [])

    document = Document(docx=file_name)

    replacement_line = ''

    for skill in skills:
        replacement_line = replacement_line + skill + ", "

    docxedit.replace_string(document, old_string='[EDIT HERE]', new_string=replacement_line)

    edited_file_name = 'Edited.docx'
    document.save(edited_file_name)

    return send_file(edited_file_name, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
