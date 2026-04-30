import { useEffect, useMemo, useRef, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export default function Translator() {
  const [languages, setLanguages] = useState([]);
  const [fromLanguage, setFromLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("ta");
  const [isListening, setIsListening] = useState(false);
  const [statusText, setStatusText] = useState("Idle");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [errorText, setErrorText] = useState("");

  const recognitionRef = useRef(null);
  const abortRef = useRef(false);

  const speechRecognitionApi = useMemo(
    () => window.SpeechRecognition || window.webkitSpeechRecognition,
    []
  );

  useEffect(() => {
    fetch(`${API_BASE_URL}/languages`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
        setLanguages(sorted);
      })
      .catch(() => setErrorText("Unable to fetch languages from backend."));
  }, []);

  const playAudio = (audioBase64) => {
    const audio = new Audio(`data:audio/mp3;base64,${audioBase64}`);
    audio.play().catch(() => {
      setErrorText("Audio playback failed. Check browser autoplay permissions.");
    });
  };

  const translateAndSpeak = async (text) => {
    setStatusText("Translating...");
    const res = await fetch(`${API_BASE_URL}/translate-speak`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        from_language: fromLanguage,
        to_language: toLanguage
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Translation request failed.");
    }

    const data = await res.json();
    setTranslatedText(data.translated_text);
    playAudio(data.audio_base64);
    setStatusText("Listening...");
  };

  const startListening = () => {
    setErrorText("");
    abortRef.current = false;

    if (!speechRecognitionApi) {
      setErrorText("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new speechRecognitionApi();
    recognition.lang = fromLanguage;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setStatusText("Listening...");
    };

    recognition.onresult = async (event) => {
      const lastResult = event.results[event.results.length - 1];
      const text = lastResult[0].transcript.trim();
      if (!text) return;

      setSourceText(text);

      try {
        await translateAndSpeak(text);
      } catch (error) {
        setErrorText(error.message);
        setStatusText("Error");
      }
    };

    recognition.onerror = (event) => {
      setErrorText(`Speech error: ${event.error}`);
      setIsListening(false);
      setStatusText("Error");
    };

    recognition.onend = () => {
      if (!abortRef.current) {
        recognition.start();
      } else {
        setIsListening(false);
        setStatusText("Stopped");
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    abortRef.current = true;
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const prettyLanguage = (code) => {
    const match = languages.find((item) => item.code === code);
    if (!match) return code;
    return match.name.charAt(0).toUpperCase() + match.name.slice(1);
  };

  const swapLanguages = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl backdrop-blur">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Real Time Language Translator
          </h1>
          <p className="mt-2 text-slate-400">
            Speak in one language, get translated speech in another instantly.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                Language Selection
              </h2>
              <button
                className="rounded-lg border border-indigo-400/40 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-200 hover:bg-indigo-500/20"
                onClick={swapLanguages}
                type="button"
              >
                Swap Languages
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                <span className="text-sm text-slate-300">Source Language</span>
                <select
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 shadow-inner shadow-indigo-950/40 focus:border-indigo-400 focus:outline-none"
                  value={fromLanguage}
                  onChange={(e) => setFromLanguage(e.target.value)}
                >
                  {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.name.charAt(0).toUpperCase() + language.name.slice(1)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                <span className="text-sm text-slate-300">Target Language</span>
                <select
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 shadow-inner shadow-indigo-950/40 focus:border-indigo-400 focus:outline-none"
                  value={toLanguage}
                  onChange={(e) => setToLanguage(e.target.value)}
                >
                  {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.name.charAt(0).toUpperCase() + language.name.slice(1)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
              <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-emerald-200">
                Speaking In: <span className="font-semibold">{prettyLanguage(fromLanguage)}</span>
              </div>
              <div className="rounded-lg border border-indigo-500/25 bg-indigo-500/10 px-3 py-2 text-indigo-200">
                Translating To: <span className="font-semibold">{prettyLanguage(toLanguage)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="rounded-lg bg-emerald-500 px-5 py-2 font-medium text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={startListening}
              disabled={isListening}
            >
              Start
            </button>
            <button
              className="rounded-lg bg-rose-500 px-5 py-2 font-medium text-white hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={stopListening}
              disabled={!isListening}
            >
              Stop
            </button>
            <div className="ml-auto rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-300">
              Status: <span className="text-indigo-300">{statusText}</span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <h2 className="text-sm font-semibold text-slate-300">Input Text</h2>
              <p className="mt-2 min-h-16 text-slate-100">
                {sourceText || "Your spoken text appears here..."}
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <h2 className="text-sm font-semibold text-slate-300">Translated Text</h2>
              <p className="mt-2 min-h-16 text-slate-100">
                {translatedText || "Translated output appears here..."}
              </p>
            </div>
          </div>

          {errorText ? (
            <div className="mt-4 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">
              {errorText}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
