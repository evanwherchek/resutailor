"""The backend service that parses job listings and edits .docx files"""

import os
from flask import Flask, request
import validators
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
from dotenv import load_dotenv

PROMPT = ("Given the text from a job description, "
          "extract the skills exactly as they appear. "
          "Limit each result to 1-2 words. "
          "Provide the response as a JSON object with the following format: "
          "{\"skills\": []} Do not say anything else in your response. "
          "The job description will begin after the 'BEGIN DESCRIPTION:'. BEGIN DESCRIPTION: ")

app = Flask(__name__)

@app.route('/parseSkills')
def hello_world():
    """Takes the job listing URL, extracts the skills from it, and returns a list"""
    url = request.args.get('postingURL', 'missing')

    load_dotenv()

    client = OpenAI(
        api_key=os.getenv('OPENAI_API_KEY')
    )

    if validators.url(url):
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')

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

    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
