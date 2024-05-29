import json
from docx import Document
import docxedit

file_name = 'ResumeTemplate.docx'
skills = json.loads('{\"skills\": [\"programming\", \"communication\"]}')

print('Editing...')
document = Document(docx=file_name)

replacement_line = ''

for skill in skills['skills']:
    replacement_line = replacement_line + skill + ", "

docxedit.replace_string(document, old_string='[EDIT HERE]', new_string=replacement_line)

document.save('Edited.docx')

print('Done!')
