import base64
import os
import tempfile
from contextlib import contextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from googletrans import LANGUAGES, Translator
from gtts import gTTS
from gtts.lang import tts_langs
from deep_translator import GoogleTranslator as DeepGoogleTranslator


app = FastAPI(title="Real Time Language Translator API")
translator = Translator()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@contextmanager
def without_proxy():
    proxy_keys = [
        "HTTP_PROXY",
        "HTTPS_PROXY",
        "http_proxy",
        "https_proxy",
        "ALL_PROXY",
        "all_proxy",
    ]
    saved = {key: os.environ.get(key) for key in proxy_keys}
    try:
        for key in proxy_keys:
            os.environ.pop(key, None)
        yield
    finally:
        for key, value in saved.items():
            if value is None:
                os.environ.pop(key, None)
            else:
                os.environ[key] = value


class TranslateRequest(BaseModel):
    text: str
    from_language: str
    to_language: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/languages")
def get_languages():
    return [{"code": code, "name": name} for code, name in LANGUAGES.items()]


@app.get("/target-languages")
def get_target_languages():
    supported_tts_codes = set(tts_langs().keys())
    target_languages = [
        {"code": code, "name": name}
        for code, name in LANGUAGES.items()
        if code in supported_tts_codes
    ]
    return sorted(target_languages, key=lambda item: item["name"])


@app.post("/translate-speak")
def translate_and_speak(payload: TranslateRequest):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="Text is required.")

    try:
        # Some local proxy setups return 403 for translate endpoints.
        with without_proxy():
            # googletrans can occasionally return 403; fallback keeps service reliable.
            try:
                translated_text = translator.translate(
                    payload.text,
                    src=payload.from_language,
                    dest=payload.to_language,
                ).text
            except Exception:
                translated_text = DeepGoogleTranslator(
                    source=payload.from_language, target=payload.to_language
                ).translate(payload.text)

        with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as tmp_file:
            audio_path = tmp_file.name

        try:
            with without_proxy():
                tts = gTTS(text=translated_text, lang=payload.to_language, slow=False)
            tts.save(audio_path)
            with open(audio_path, "rb") as file_obj:
                audio_bytes = file_obj.read()
        finally:
            if os.path.exists(audio_path):
                os.remove(audio_path)

        return {
            "source_text": payload.text,
            "translated_text": translated_text,
            "audio_base64": base64.b64encode(audio_bytes).decode("utf-8"),
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
