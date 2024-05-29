"""The backend python code that runs to return a list of skills"""
import os
import json
import validators
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
from dotenv import load_dotenv
from halo import Halo
from docx import Document
import docxedit

PROMPT = ("Given the following text from a job description, "
          "extract the skills exactly as they appear. "
          "Limit each result to 1-2 words. "
          "Provide the response as a JSON object with the following format: "
          "{\"skills\": []} Do not say anything else in your response. "
          "The job description will begin after the 'BEGIN DESCRIPTION:'. BEGIN DESCRIPTION: ")

load_dotenv()

client = OpenAI(
    api_key=os.getenv('OPENAI_API_KEY')
)

url = input('Job posting URL: ')

if validators.url(url):
    spinner = Halo(text='Loading', spinner='dots')
    spinner.start()

    response = requests.get(url, timeout=10)
    soup = BeautifulSoup(response.text, 'html.parser')

    try:
        COMPLETION = client.chat.completions.create(
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

        skills = json.loads(COMPLETION.choices[0].message.content)

        file_name = 'ResumeTemplate.docx'

        print('Editing...')
        document = Document(docx=file_name)

        replacement_line = ''

        for skill in skills['skills']:
            replacement_line = replacement_line + skill + ", "

        docxedit.replace_string(document, old_string='[EDIT HERE]', new_string=replacement_line)
        document.save('Edited.docx')

        spinner.stop()
        print('Done!')

    except TimeoutError as e:
        spinner.stop()
        print(str(e))

else:
    print('Please enter a valid URL')
