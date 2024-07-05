<div align="center">
<img src="https://github.com/evanwherchek/resutailor/assets/50429973/34758078-1022-407f-82cf-d06bc3713572" width="85%">
</div>

<p align="center">ResuTailor is a web application that allows you to automatically insert skills into your resume based on a job description providing an ATS advantage when applying for jobs.</p>

## Getting started

To configure ResuTailor, clone the codebase to your machine and do the following:

<ins>Generate an OpenAI API Key</ins>

To generate an OpenAI API key, you need to follow these steps:
1. Visit the OpenAI website and sign up if you haven't already.
2. Navigate to the API section.
3. Click on 'Create New API Key'.
4. Copy the generated API key.

<ins>Create a .env File</ins>

After generating your OpenAI API key, the next step is to create a .env file in the backend directory. Here's how to do it:
1. Navigate to the backend directory of the project.
2. Create a new file and name it ```.env```.
3. Open the .env file and add the following line: ```OPENAI_API_KEY=your_api_key```. Replace ```your_api_key``` with the API key you generated in the last section.

<ins>Add Your Resume</ins>

The final step is to add your resume to the backend directory. The resume file should be a .docx file and should be named "Template.docx".
1. Prepare your resume and save it as a .docx file.
2. Rename the file to "Template.docx".
3. Move or copy the "Template.docx" file to the backend directory of the project.
