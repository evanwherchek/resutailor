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

# Get access to the environment variable with the OpenAI secret key
load_dotenv()

# Initialize the client that will access GPT-4
client = OpenAI(
    api_key=os.getenv('OPENAI_API_KEY')
)

# Request a job posting URL from the user *This will change when this code becomes a Django app
url = input('Job posting URL: ')

# Ensure that the URL is valid
if validators.url(url):
    # Show a loading spinner
    spinner = Halo(text='Loading', spinner='dots')
    spinner.start()

    # Send a request for the page text
    response = requests.get(url, timeout=10)
    soup = BeautifulSoup(response.text, 'html.parser')

    try:
        # Send the prompt to GPT-4 with the returned page text
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

        # Convert the response from GPT-4 into a usable JSON object
        response_json = json.loads(COMPLETION.choices[0].message.content)

        spinner.stop()

        # Print out the skills found by GPT-4
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
        # TODO: Catch more errors in the Django version of this code
        spinner.stop()
        print(str(e))

else:
    # Return an error message if the URL is invalid
    print('Please enter a valid URL')
