
import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
print(f"Testing key: {api_key[:10]}...")

client = Groq(api_key=api_key)

try:
    completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "Hello",
            }
        ],
        model="llama-3.3-70b-versatile",
    )
    print("Success! Response:", completion.choices[0].message.content)
except Exception as e:
    print("Error:", e)
