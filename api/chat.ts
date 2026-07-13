import { chatKnowledge } from "../src/app/data/portfolio";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "GEMINI_API_KEY not configured on server" });
    return;
  }

  const { message, history } = req.body || {};
  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Missing message" });
    return;
  }

  const contents = [
    ...(Array.isArray(history) ? history : []).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content ?? "") }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: chatKnowledge }] },
          contents,
        }),
      }
    );

    if (!response.ok) {
      const detail = await response.text();
      res.status(502).json({ error: "AI service error", detail });
      return;
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") ||
      "Sorry, I couldn't generate a response.";

    res.status(200).json({ reply });
  } catch {
    res.status(500).json({ error: "Internal error" });
  }
}
