"""The backend service that parses job listings and edits .docx files"""

import os

from flask import Flask, request, send_file
from flask_cors import CORS
from openai import OpenAI, _exceptions
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from docx import Document
import validators
import requests
import docxedit

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
            return {'error': 'Unprocessable content'}, 422

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
        except _exceptions.RateLimitError:
            return {'error': 'Context window exceeded'}, 413
        except _exceptions.APITimeoutError:
            return {'error': 'OpenAI timeout'}, 408
    else:
        return {'error': 'Bad request'}, 400

@app.route('/appendSkills', methods=['POST'])
def append_skills():
    """Appends a list of skills to a resume"""

    skills = request.get_json().get('skills', [])

    if not skills:
        return {'error': 'Unprocessable content'}, 422

    file_name = 'ResumeTemplate.docx'

    if not os.path.exists(file_name):
        return {'error': 'File ' + file_name + ' not found'}, 404

    document = Document(docx=file_name)

    replacement_line = ''

    for index, skill in enumerate(skills):
        replacement_line += skill
        if index != len(skills) - 1:
            replacement_line += ', '

    docxedit.replace_string(document, old_string='[EDIT HERE]', new_string=replacement_line)

    edited_file_name = 'Edited.docx'

    return send_file(edited_file_name, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
