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

# The prompt for OpenAI aims to be as specific as possible to return a usable result
PROMPT = ("Given the text from a job description, "
          "extract the skills exactly as they appear. "
          "Limit each result to 1-2 words. "
          "Provide the response as a JSON object with the following format: "
          "{\"skills\": []} Do not say anything else in your response. "
          "The job description will begin after the 'BEGIN DESCRIPTION:'. BEGIN DESCRIPTION: ")

# These can be changed as you see fit
TEMPERATURE = 0.2
MODEL = 'gpt-4'
TIMEOUT = 10

app = Flask(__name__)
CORS(app)

load_dotenv() # Load the OpenAI API key from .env

client = OpenAI(
    api_key=os.getenv('OPENAI_API_KEY')
)

@app.route('/parseSkills', methods=['GET'])
def parse_skills():
    """
    Takes the job listing URL, extracts the skills from it, and returns a list
    """

    url = request.args.get('postingUrl')

    if not validators.url(url):
        return {'error': 'Bad request'}, 400

    page_text = ''

    # Request the job description from the provided URL
    response = requests.get(url, timeout=10)
    soup = BeautifulSoup(response.text, 'html.parser')
    page_text = soup.get_text()

    if page_text == '':
        return {'error': 'Unprocessable content'}, 422

    try:
        # Pass the prompt with the job description to OpenAI
        completion = client.chat.completions.create(
            temperature = TEMPERATURE,
            model = MODEL,
            timeout = TIMEOUT,
            messages = [
                {
                    'role': 'user',
                    'content': PROMPT + page_text
                }
            ]
        )

        return completion.choices[0].message.content
    except _exceptions.RateLimitError:
        return {'error': 'Context window exceeded'}, 413
    except _exceptions.APITimeoutError:
        return {'error': 'OpenAI timeout'}, 408

@app.route('/parseFromText', methods=['POST'])
def parse_from_text():
    """
    Takes the job listing text, extracts the skills from it, and returns a list
    """

    data = request.get_json()
    page_text = data['description']

    if page_text == '':
        return {'error': 'Unprocessable content'}, 422

    try:
        # Pass the prompt with the job description to OpenAI
        completion = client.chat.completions.create(
            temperature = TEMPERATURE,
            model = MODEL,
            timeout = TIMEOUT,
            messages = [
                {
                    'role': 'user',
                    'content': PROMPT + page_text
                }
            ]
        )

        return completion.choices[0].message.content
    except _exceptions.RateLimitError:
        return {'error': 'Context window exceeded'}, 413
    except _exceptions.APITimeoutError:
        return {'error': 'OpenAI timeout'}, 408

@app.route('/appendSkills', methods=['POST'])
def append_skills():
    """
    Appends a list of skills to a resume
    """

    skills = request.get_json().get('skills', [])

    if not skills: # Check if the skills list is empty
        return {'error': 'Unprocessable content'}, 422

    file_name = 'Template.docx'

    if not os.path.exists(file_name):
        return {'error': 'File ' + file_name + ' not found'}, 404

    document = Document(docx=file_name) # Open the document template

    full_text = ' '.join([paragraph.text for paragraph in document.paragraphs])

    if '[EDIT HERE]' not in full_text:
        return {'error': 'Missing edit tag in template'}, 422

    replacement_line = ''

    # Create the line that will be added to the skills section of the document
    for index, skill in enumerate(skills):
        replacement_line += skill
        if index != len(skills) - 1:
            replacement_line += ', '

    # Append the skills to the document
    docxedit.replace_string(document, old_string='[EDIT HERE]', new_string=replacement_line)

    new_file_name = 'Edited.docx'
    document.save(new_file_name)

    return send_file(new_file_name, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=False)
