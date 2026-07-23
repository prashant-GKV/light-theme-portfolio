import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { getPortfolioContext } from "../lib/portfolioContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatBot({ initialMessage }: { initialMessage?: string }) {
  const [open, setOpen] = useState(!!initialMessage);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Prashant AI 👋 Ask me anything about Prashant's skills, projects, certifications, or experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<string>("");

  // Re-extract live portfolio content every time the chat panel opens,
  // so edits made to the page are always reflected without touching this code.
  useEffect(() => {
    if (open) {
      contextRef.current = getPortfolioContext();
    }
  }, [open]);

  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      setOpen(true);
      handleSend(initialMessage);
    }
  }, [initialMessage]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;

    const history = messages.slice(-8);
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setTyping(true);

    try {
      if (!contextRef.current) contextRef.current = getPortfolioContext();

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history, portfolioContext: contextRef.current }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I hit an error reaching the assistant. Please try again in a moment." },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* Floating bubble */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            onClick={() => setOpen(true)}
            style={{
              position: "fixed",
              bottom: 28,
              right: 28,
              zIndex: 150,
              width: 52,
              height: 52,
              borderRadius: "50%",
              backgroundColor: "#6D28D9",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 24px rgba(109,40,217,0.30)",
              color: "#fff",
            }}
          >
            <MessageCircle size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: 28,
              right: 28,
              zIndex: 150,
              width: 360,
              height: 500,
              backgroundColor: "#FFFFFF",
              border: "1px solid rgba(18,20,43,0.10)",
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(18,20,43,0.06), 0 24px 64px rgba(18,20,43,0.16)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(18,20,43,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "rgba(109,40,217,0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6D28D9",
                  }}
                >
                  <Bot size={18} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "#12142B" }}>
                    Prashant AI
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#047857" }}>
                    ● Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", color: "#676D8A", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "80%",
                      padding: "10px 14px",
                      borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                      backgroundColor: msg.role === "user" ? "#6D28D9" : "#F4F5FA",
                      border: msg.role === "assistant" ? "1px solid rgba(18,20,43,0.07)" : "none",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      color: msg.role === "user" ? "#FFFFFF" : "#12142B",
                      lineHeight: 1.6,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div
                    style={{
                      padding: "10px 16px",
                      borderRadius: "14px 14px 14px 4px",
                      backgroundColor: "#F4F5FA",
                      border: "1px solid rgba(18,20,43,0.07)",
                    }}
                  >
                    <div style={{ display: "flex", gap: 4 }}>
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, delay: i * 0.15, duration: 0.6 }}
                          style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#6D28D9" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: "12px 16px",
                borderTop: "1px solid rgba(18,20,43,0.08)",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  backgroundColor: "#F4F5FA",
                  border: "1px solid rgba(18,20,43,0.10)",
                  borderRadius: 10,
                  padding: "8px 12px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: "#12142B",
                  outline: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#6D28D9")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(18,20,43,0.10)")}
              />
              <button
                onClick={() => handleSend()}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: "#6D28D9",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
