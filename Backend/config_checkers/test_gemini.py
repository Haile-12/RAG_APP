# Test Gemini API connection not used in the app but for checking if the API key is valid and working fine
# You can run this script by using "python test_gemini.py"  to see the available models in your environment
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

try:
    model = genai.GenerativeModel('models/gemini-flash-latest')
    response = model.generate_content("Say hello")
    print("✅ Gemini works! Response:", response.text)
except Exception as e:
    print(" Gemini failed:", e)