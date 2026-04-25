"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/site/language-provider";
import styles from "./ChatBot.module.css";

type Language = "cs" | "en";

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

const USD_PRICE_BY_ID: Record<number, string> = {
  1: "$429",
  2: "$649",
  3: "$89",
  4: "$3,390",
  5: "$5,190",
  6: "$6,490",
  7: "$4,090",
  8: "$779",
  9: "$329",
  10: "$10,890",
  11: "$869",
  12: "$12,990",
  13: "$9,490",
  14: "$16,990",
  15: "$2,190 - $5,190",
};

const CHAT_COPY: Record<
  Language,
  {
    welcome: string;
    unavailable: string;
    ariaOpen: string;
    ariaClose: string;
    titleOpen: string;
    titleClose: string;
    dialogLabel: string;
    headerTitle: string;
    headerSub: string;
    closeLabel: string;
    placeholder: string;
    sendLabel: string;
    viewLabel: string;
  }
> = {
  cs: {
    welcome:
      "Zdravím! Jsem váš průvodce světem REGEN dronů. Popište mi vaše potřeby — ať už hledáte dron na cestování, pro firmu, FPV závody nebo náročné mise, vyberu pro vás ten správný stroj.",
    unavailable:
      "Omlouváme se, momentálně nedokáži odpovědět. Zkuste to prosím za chvíli.",
    ariaOpen: "Otevřít REGEN asistenta",
    ariaClose: "Zavřít chat",
    titleOpen: "Zeptat se na drony",
    titleClose: "Zavřít chat",
    dialogLabel: "REGEN Drone Asistent",
    headerTitle: "REGEN Asistent",
    headerSub: "Drone Expert · Online",
    closeLabel: "Zavřít",
    placeholder: "Napište svůj dotaz…",
    sendLabel: "Odeslat zprávu",
    viewLabel: "Zobrazit",
  },
  en: {
    welcome:
      "Hello! I am your guide to REGEN drones. Tell me what you need — whether you want a travel drone, a business platform, an FPV racer, or a system for demanding missions, I will help you choose the right machine.",
    unavailable:
      "Sorry, I cannot answer right now. Please try again in a moment.",
    ariaOpen: "Open REGEN assistant",
    ariaClose: "Close chat",
    titleOpen: "Ask about drones",
    titleClose: "Close chat",
    dialogLabel: "REGEN Drone Assistant",
    headerTitle: "REGEN Assistant",
    headerSub: "Drone Expert · Online",
    closeLabel: "Close",
    placeholder: "Type your question…",
    sendLabel: "Send message",
    viewLabel: "View",
  },
};

function formatPrice(drone: Drone, language: Language): string {
  if (language === "en") {
    return USD_PRICE_BY_ID[drone.id] ?? `$${Math.max(
      1,
      Math.round(drone.price / 23)
    ).toLocaleString("en-US")}`;
  }

  return drone.price.toLocaleString("cs-CZ") + "\u00a0Kč";
}

function getWelcomeMessage(language: Language): Message {
  return {
    role: "bot",
    text: CHAT_COPY[language].welcome,
  };
}

export default function ChatBot() {
  const { language } = useLanguage();
  const copy = CHAT_COPY[language];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() =>
    [getWelcomeMessage(language)]
  );
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

  useEffect(() => {
    setMessages([getWelcomeMessage(language)]);
    setInput("");
    setLoading(false);
  }, [language]);

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
        body: JSON.stringify({ message: text, language }),
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
          text: copy.unavailable,
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
        aria-label={open ? copy.ariaClose : copy.ariaOpen}
        title={open ? copy.titleClose : copy.titleOpen}
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
        <div className={styles.panel} role="dialog" aria-label={copy.dialogLabel}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.headerDot} />
              <div>
                <div className={styles.headerTitle}>{copy.headerTitle}</div>
                <div className={styles.headerSub}>{copy.headerSub}</div>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label={copy.closeLabel}
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
                              {formatPrice(drone, language)}
                            </span>
                          </div>
                          <div className={styles.droneCardDesc}>{drone.desc}</div>
                        </div>
                        <button
                          className={styles.droneCardBtn}
                          onClick={() => handleViewDrone(drone.id)}
                          aria-label={`${copy.viewLabel} ${drone.name}`}
                        >
                          {copy.viewLabel}
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
              placeholder={copy.placeholder}
              disabled={loading}
              maxLength={300}
              autoComplete="off"
            />
            <button
              className={styles.sendBtn}
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label={copy.sendLabel}
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
