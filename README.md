# Real-Time Language Translator Bot

## 01 Introduction

A voice recognition-based tool for translating languages in real-time. This tool serves as a virtual interpreter, offering users a convenient and efficient way to bridge language gaps. Inspired by the natural process of human translation, the tool listens to spoken words and converts them into the target language, replicating the fluidity and accuracy of a human translator.

 ![Banner Image](docs/media/0-banner-image.png)

 ## 02 Technology Stack

 - **Frontend:** React, Vite, Tailwind CSS, Web Speech API (browser)
 - **Backend:** Python, FastAPI, Uvicorn, gTTS, `googletrans`, `deep-translator` (fallback)
 - **Docs assets:** `docs/media/` (banner, diagram, demo video link)

 ## 03 System Architeture Diagram

 ![diagram](docs/media/1-system-architeture.png)

## 04 Project Structure

- `backend/` — API and translation/TTS (`requirements.txt` lives here).
- `frontend/` — React + Tailwind UI (`npm install` in this folder).
- `docs/media/` — images and demo assets referenced in this README.
- `research/` — optional language-pair experiment scripts (not used by the main app).

## 05 Usage

- **Step 01:** Start backend from `backend/`.

  ```
   cd backend
   pip install -r requirements.txt
   uvicorn app:app --reload --host 127.0.0.1 --port 8000
  ```

- **Step 02:** Start frontend from `frontend/`.

  ```
   cd frontend
   cp .env.example .env
   npm install
   npm run dev -- --port 5174
  ```

- **Step 03:** Open the app in the browser.

  - Marketing home: `http://localhost:5174/`
  - Translator app: `http://localhost:5174/translator`

[2-demo-video.webm](https://github.com/gunarakulangunaretnam/language-translator-bot/assets/45822509/86a26bf0-0500-42e1-a626-497084cc7772)

# Contact

### Website: 

[![Visit](https://img.shields.io/badge/Visit%3A%20www.gunarakulan.info-%23E01E5A?style=flat&logo=realm&logoColor=white)](https://www.gunarakulan.info)

### Social Media:

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gunarakulangunaretnam)
[![Facebook](https://img.shields.io/badge/-Facebook-196dcc?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/gunarakulangunaretnam)
[![WhatsApp](https://img.shields.io/badge/-WhatsApp-07a647?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/94740001141?text=WhatsApp%3A%20%2B9740001141)
[![Instagram](https://img.shields.io/badge/-Instagram-bd3651?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/gunarakulangunaretnam)
[![X.COM](https://img.shields.io/badge/-X.COM-0066ff?style=for-the-badge&logo=x&logoColor=white)](https://x.com/gunarakulangr)
[![Kaggle](https://img.shields.io/badge/-Kaggle-3295bd?style=for-the-badge&logo=kaggle&logoColor=white)](https://www.kaggle.com/gunarakulangr)
[![TikTok](https://img.shields.io/badge/-TikTok-579ea3?style=for-the-badge&logo=tiktok&logoColor=white)](https://www.tiktok.com/@gunarakulangunaretnam)
[![YouTube](https://img.shields.io/badge/-YouTube-a82121?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/channel/UCjMOdgHFAjAdBKiqV8y2Tww)
