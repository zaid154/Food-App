import { useState } from "react";
import OpenAI from "openai";
import translations from "../utils/constToggle";
import { MY_API } from "../utils/Constants";

const client = MY_API
  ? new OpenAI({
      apiKey: MY_API,
      baseURL: "https://api.groq.com/openai/v1",
      dangerouslyAllowBrowser: true,
    })
  : null;

const toApiMessages = (msgs) =>
  msgs
    .filter((m) => m.role === "user" || m.role === "ai")
    .map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    }));

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
        { role: "user", text: input.trim() },
        { role: "ai", text: t.noApiKey },
      ]);
      setInput("");
      return;
    }

    const userMessage = input.trim();
    const historyBeforeSend = messages;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage },
      { role: "ai", text: t.thinking },
    ]);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = [
        {
          role: "system",
          content:
            "You are a helpful food and restaurant assistant for the YumRun food delivery app. Give short, friendly answers about food, recipes, restaurants, and ordering.",
        },
        ...toApiMessages([
          ...historyBeforeSend,
          { role: "user", text: userMessage },
        ]),
      ];

      const response = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: apiMessages,
        temperature: 0.7,
      });

      const reply =
        response?.choices?.[0]?.message?.content || "No response received.";

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "ai", text: reply },
      ]);
    } catch (err) {
      console.error("Groq Error:", err);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "ai",
          text: err?.message || "Failed to get response from Groq API",
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
          <h1 className="text-xl font-semibold text-slate-900">{t.title}</h1>

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
            className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900"
          >
            <option value="en">EN</option>
            <option value="hi">हिंदी</option>
            <option value="es">ES</option>
          </select>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-lg rounded-2xl px-5 py-3 text-sm shadow-md ${
                msg.role === "user"
                  ? "ml-auto bg-red-600 text-white"
                  : "border border-slate-200 bg-slate-50 text-slate-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex gap-3 border-t border-slate-200 p-4">
          <input
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={loading}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "..." : t.send}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatGptModel;
