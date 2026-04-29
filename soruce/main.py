import os
import time
import platform
import subprocess
import tempfile
from gtts import gTTS
import streamlit as st
import speech_recognition as sr
from googletrans import LANGUAGES, Translator

isTranslateOn = False

translator = Translator() # Initialize the translator module.

# Create a mapping between language names and language codes
language_mapping = {name: code for code, name in LANGUAGES.items()}

def get_language_code(language_name):
    return language_mapping.get(language_name, language_name)

def translator_function(spoken_text, from_language, to_language):
    return translator.translate(spoken_text, src='{}'.format(from_language), dest='{}'.format(to_language))

def text_to_voice(text_data, to_language):
    myobj = gTTS(text=text_data, lang='{}'.format(to_language), slow=False)
    with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as tmp_file:
        audio_path = tmp_file.name

    try:
        myobj.save(audio_path)

        # On macOS (including Apple Silicon), use the native player.
        if platform.system() == "Darwin":
            subprocess.run(["afplay", audio_path], check=True)
        else:
            # Non-macOS fallback: keep app alive if audio playback is unavailable.
            st.warning("Audio playback is not configured for this OS in current setup.")
    finally:
        if os.path.exists(audio_path):
            os.remove(audio_path)

def get_microphone_choices():
    names = sr.Microphone.list_microphone_names()
    choices = [("Default input device", None)]
    for idx, name in enumerate(names):
        choices.append((f"{idx}: {name}", idx))
    return choices

def main_process(output_placeholder, from_language, to_language, mic_device_index):
    
    global isTranslateOn
    
    while isTranslateOn:

        rec = sr.Recognizer()
        try:
            with sr.Microphone(device_index=mic_device_index) as source:
                output_placeholder.text("Listening...")
                rec.pause_threshold = 1
                audio = rec.listen(source, phrase_time_limit=10)
        except Exception as e:
            isTranslateOn = False
            st.error(
                "Microphone not available. Select another input device and allow microphone access for Terminal/Python in macOS Privacy settings."
            )
            st.exception(e)
            break
        
        try:
            output_placeholder.text("Processing...")
            spoken_text = rec.recognize_google(audio, language='{}'.format(from_language))
            
            output_placeholder.text("Translating...")
            translated_text = translator_function(spoken_text, from_language, to_language)

            text_to_voice(translated_text.text, to_language)
    
        except Exception as e:
            print(e)

# UI layout
st.title("Language Translator")

# Dropdowns for selecting languages
from_language_name = st.selectbox("Select Source Language:", list(LANGUAGES.values()))
to_language_name = st.selectbox("Select Target Language:", list(LANGUAGES.values()))

# Convert language names to language codes
from_language = get_language_code(from_language_name)
to_language = get_language_code(to_language_name)

# Microphone selector
microphone_choices = get_microphone_choices()
microphone_labels = [label for label, _ in microphone_choices]
selected_microphone_label = st.selectbox("Select Input Microphone:", microphone_labels)
selected_microphone_index = dict(microphone_choices)[selected_microphone_label]

# Button to trigger translation
start_button = st.button("Start")
stop_button = st.button("Stop")

# Check if "Start" button is clicked
if start_button:
    if not isTranslateOn:
        isTranslateOn = True
        output_placeholder = st.empty()
        main_process(output_placeholder, from_language, to_language, selected_microphone_index)

# Check if "Stop" button is clicked
if stop_button:
    isTranslateOn = False
