import google.generativeai as genai
from app.core.config import settings


if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)


def ask_gemini(prompt: str) -> str:

    if not settings.GEMINI_API_KEY:
        return "Gemini API key is not configured."

    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"AI service error: {str(e)}"