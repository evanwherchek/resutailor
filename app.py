from flask import Flask, request
import os
import json
import validators
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
from dotenv import load_dotenv
from halo import Halo

PROMPT = ("Given the following text from a job description, "
          "extract the hard skills and the soft skills exactly as they appear. "
          "Limit each result to 1-2 words. "
          "Provide the response as a JSON object similar to the following: "
          "{\"hardSkills\": [], \"softSkills\": []} Do not say anything else in your response. "
          "The job description will begin after the 'BEGIN DESCRIPTION:'. BEGIN DESCRIPTION: ")


app = Flask(__name__)

@app.route('/parseSkills')
def hello_world():
    url = request.args.get('postingURL', 'missing')

    load_dotenv()

    client = OpenAI(
        api_key=os.getenv('OPENAI_API_KEY')
    )

    if validators.url(url):
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')

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

        return COMPLETION.choices[0].message.content

    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)