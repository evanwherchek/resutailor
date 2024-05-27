"""The backend python code that runs to return a list of skills"""
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

        response_json = json.loads(COMPLETION.choices[0].message.content)

        spinner.stop()

        print('\nHard skills')
        print('-----------')

        for hard_skill in response_json['hardSkills']:
            print(hard_skill)

        print('\nSoft skills')
        print('-----------')

        for soft_skill in response_json['softSkills']:
            print(soft_skill)

        print('\n')
    except TimeoutError as e:
        spinner.stop()
        print(str(e))

else:
    print('Please enter a valid URL')
