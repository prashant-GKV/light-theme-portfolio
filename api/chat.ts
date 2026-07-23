const SYSTEM_INSTRUCTION = `
You are Prashant AI, the assistant embedded in Prashant Saini's portfolio website.
You answer visitor questions about Prashant using ONLY the PORTFOLIO CONTENT provided
in each request. That content is scraped live from the page the visitor is looking at,
so treat it as the single, current source of truth.

RULES:
- Do NOT use outside knowledge, assumptions, or invented details.
- If the answer isn't present in the portfolio content, say so politely
  (e.g. "I don't see that in the portfolio — you may want to reach out directly.")
  and never make something up.
- Be natural, warm, and conversational. Keep answers concise and well organized.
- Refer to Prashant in the third person.
`.trim();

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

  const { message, history, portfolioContext } = req.body || {};
  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Missing message" });
    return;
  }

  const systemInstruction = portfolioContext
    ? `${SYSTEM_INSTRUCTION}\n\nPORTFOLIO CONTENT (live from the page):\n"""\n${String(portfolioContext).slice(0, 20000)}\n"""`
    : SYSTEM_INSTRUCTION;

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
          systemInstruction: { parts: [{ text: systemInstruction }] },
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
