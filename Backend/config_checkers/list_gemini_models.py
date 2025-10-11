# List available Gemini models that support content generation you can choose any model based on your needs (not used in the app) only for reference and checking if the API key is valid
# You can run this script by using "python list_gemini_models.py"  to see the available models in your environment
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

try:
    models = genai.list_models()
    print(" Available models For You:-")
    for m in models:
        if 'generateContent' in m.supported_generation_methods:
            print(f"  - {m.name}")
except Exception as e:
    print(" Error:", e)