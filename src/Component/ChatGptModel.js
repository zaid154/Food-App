import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import translations from "../utils/constToggle";
import { MY_API } from "../utils/Constants";

const client = MY_API
  ? new GoogleGenAI({
      apiKey: MY_API,
    })
  : null;

// Render Gemini's lightweight markdown (**bold**, *italic*, line breaks) as
// real React nodes instead of showing the raw ** and * characters.
const formatMessage = (text) =>
  text.split("\n").map((line, lineIndex) => (
    <span key={lineIndex}>
      {line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return part;
      })}
      {lineIndex < text.split("\n").length - 1 && <br />}
    </span>
  ));

const ChatGptModel = () => {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: t.greeting,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    if (!MY_API || !client) {
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          text: input.trim(),
        },
        {
          role: "ai",
          text: t.noApiKey,
        },
      ]);
      setInput("");
      return;
    }

    const userMessage = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
      {
        role: "ai",
        text: t.thinking,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const history = messages
        .map((msg) => {
          const speaker = msg.role === "user" ? "User" : "Assistant";
          return `${speaker}: ${msg.text}`;
        })
        .join("\n");

      const prompt = `
You are YumRun AI, a helpful food and restaurant assistant.

Rules:
- Answer only food, recipes, restaurants, cooking and ordering related questions.
- Give a direct, useful answer with concrete suggestions right away.
- Do NOT keep asking the same clarifying question. If a detail is missing, make a sensible assumption and answer anyway.
- Keep answers short and friendly.

Conversation:
${history}

User: ${userMessage}
`;

      const response = await client.models.generateContent({
        model: "gemini-flash-lite-latest",
        contents: prompt,
      });

      const reply =
        response.text || "Sorry, I couldn't generate a response.";

      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "ai",
          text: reply,
        },
      ]);
    } catch (err) {
      console.error("Gemini Error:", err);

      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "ai",
          text: err.message || "Failed to get response from Gemini.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-20 flex min-h-[70vh] justify-center px-4 py-8">
      <div className="flex h-[75vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <h1 className="text-xl font-semibold text-slate-900">
            {t.title}
          </h1>

          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);

              setMessages([
                {
                  role: "ai",
                  text: translations[e.target.value].greeting,
                },
              ]);
            }}
            className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
          >
            <option value="en">EN</option>
            <option value="hi">हिंदी</option>
            <option value="es">ES</option>
          </select>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-lg rounded-2xl px-5 py-3 text-sm shadow-md ${
                msg.role === "user"
                  ? "ml-auto bg-red-600 text-white"
                  : "border border-slate-200 bg-slate-50 text-slate-800"
              }`}
            >
              {msg.role === "user" ? msg.text : formatMessage(msg.text)}
            </div>
          ))}
        </div>

        <div className="flex gap-3 border-t border-slate-200 p-4">
          <input
            value={input}
            disabled={loading}
            placeholder={t.placeholder}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "..." : t.send}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChatGptModel;
