from langdetect import detect

LANGUAGE_MAP = {
    "en": "English",
    "hi": "Hindi",
    "de": "German",
    "fr": "French",
    "es": "Spanish",
    "it": "Italian",
    "pt": "Portuguese",
    "ar": "Arabic",
    "nl": "Dutch",
    "ja": "Japanese",
    "ko": "Korean",
    "zh-cn": "Chinese",
}

def detect_language(text: str) -> str:
    try:
        code = detect(text)
        return LANGUAGE_MAP.get(code, "English")
    except Exception:
        return "English"