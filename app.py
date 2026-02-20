from flask import Flask, render_template, request, jsonify
from data import resume_data
import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

api_key = os.getenv("GROQ_API_KEY")
print(f"DEBUG: Loaded API Key: {api_key[:5]}... if key else None")

# Initialize Groq Client
client = Groq(
    api_key=api_key,
)

def generate_system_prompt(data):
    """Generates a system prompt based on resume data."""
    prompt = f"""You are a helpful AI assistant for {data['name']}'s portfolio website. 
    Your goal is to answer questions about {data['name']} based strictly on the following resume data.
    
    Resume Data:
    Name: {data['name']}
    Title: {data['title']}
    About: {data['about']}
    Contact: {data['contact']}
    Skills: {data['skills']}
    Education: {data['education']}
    Experience: {data['experience']}
    Projects: {data['projects']}
    Awards: {data['awards']}
    Languages: {data['languages_spoken']}
    
    Guidelines:
    - Be polite, professional, and concise.
    - If asked about something not in the resume, say you don't have that information.
    - Act as if you are {data['name']}'s virtual assistant.
    - Keep answers short and relevant to a portfolio context.
    """
    return prompt

@app.route('/')
def home():
    return render_template('index.html', data=resume_data)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    try:
        completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": generate_system_prompt(resume_data)
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ],
            model="llama-3.3-70b-versatile",
        )
        response_text = completion.choices[0].message.content
        return jsonify({'response': response_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
