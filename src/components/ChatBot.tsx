"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ChatBot.module.css";

type Drone = {
  id: number;
  name: string;
  price: number;
  category: string;
  tags: string[];
  desc: string;
};

type Message =
  | { role: "user"; text: string }
  | { role: "bot"; text: string; drones?: Drone[] };

function formatPrice(price: number): string {
  return price.toLocaleString("cs-CZ") + "\u00a0Kč";
}

const WELCOME: Message = {
  role: "bot",
  text: "Zdravím! Jsem váš průvodce světem REGEN dronů. Popište mi vaše potřeby — ať už hledáte dron na cestování, pro firmu, FPV závody nebo náročné mise, vyberu pro vás ten správný stroj.",
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever messages change or typing indicator appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error("Chat API request failed");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.text, drones: data.drones },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Omlouváme se, momentálně nedokáži odpovědět. Zkuste to prosím za chvíli.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleViewDrone(id: number) {
    window.location.hash = "#drone-" + id;
  }

  return (
    <>
      {/* ── Floating trigger bubble ─────────────────────────────────────── */}
      <button
        className={styles.bubble}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Zavřít chat" : "Otevřít REGEN asistenta"}
        title={open ? "Zavřít chat" : "Zeptat se na drony"}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* ── Chat panel ───────────────────────────────────────────────────── */}
      {open && (
        <div className={styles.panel} role="dialog" aria-label="REGEN Drone Asistent">
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.headerDot} />
              <div>
                <div className={styles.headerTitle}>REGEN Asistent</div>
                <div className={styles.headerSub}>Drone Expert · Online</div>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Zavřít"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.msgRow} ${
                  msg.role === "user" ? styles.msgRowUser : styles.msgRowBot
                }`}
              >
                <div
                  className={`${styles.msgBubble} ${
                    msg.role === "user"
                      ? styles.msgBubbleUser
                      : styles.msgBubbleBot
                  }`}
                >
                  {msg.text}
                </div>

                {/* Drone cards (bot messages only) */}
                {msg.role === "bot" && msg.drones && msg.drones.length > 0 && (
                  <div className={styles.droneCards}>
                    {msg.drones.map((drone) => (
                      <div key={drone.id} className={styles.droneCard}>
                        <div className={styles.droneCardBody}>
                          <div className={styles.droneCardName}>{drone.name}</div>
                          <div className={styles.droneCardMeta}>
                            <span className={styles.droneCardCategory}>
                              {drone.category}
                            </span>
                            <span className={styles.droneCardPrice}>
                              {formatPrice(drone.price)}
                            </span>
                          </div>
                          <div className={styles.droneCardDesc}>{drone.desc}</div>
                        </div>
                        <button
                          className={styles.droneCardBtn}
                          onClick={() => handleViewDrone(drone.id)}
                          aria-label={`Zobrazit ${drone.name}`}
                        >
                          Zobrazit
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className={`${styles.msgRow} ${styles.msgRowBot}`}>
                <div className={styles.typing}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input row */}
          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              className={styles.input}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Napište svůj dotaz…"
              disabled={loading}
              maxLength={300}
              autoComplete="off"
            />
            <button
              className={styles.sendBtn}
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label="Odeslat zprávu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
