"use client";

import { useEffect, useRef, useState } from "react";

const WIDGET_ID = "elfsight-app-6da3b3cc-8e16-4fdf-a0e7-3a00930207e8";
const PLATFORM_URL = "https://elfsightcdn.com/platform.js";
const WIDGET_RENDERED_SELECTOR =
  ".eapps-widget, [class*='eapps-'], iframe[src*='elfsight'], iframe[title*='Elfsight']";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __robiAgentElfsightPlatform?: Promise<void>;
  }
}

function track(event: string) {
  window.gtag?.("event", event, { widget: "robiagent" });
}

function loadPlatform() {
  if (window.__robiAgentElfsightPlatform) return window.__robiAgentElfsightPlatform;

  const existing = document.querySelector<HTMLScriptElement>(
    'script[src="https://elfsightcdn.com/platform.js"]',
  );

  window.__robiAgentElfsightPlatform = new Promise((resolve, reject) => {
    if (existing) {
      if (existing.dataset.loaded === "true") resolve();
      else {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("Elfsight unavailable")), { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = PLATFORM_URL;
    script.defer = true;
    script.setAttribute("data-use-service-core", "");
    script.dataset.robiagentElfsightPlatform = "true";
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", () => {
      script.remove();
      delete window.__robiAgentElfsightPlatform;
      reject(new Error("Elfsight unavailable"));
    }, { once: true });
    document.head.appendChild(script);
  });

  return window.__robiAgentElfsightPlatform;
}

export default function RobiAgentChatLauncher() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"ready" | "loading" | "loaded" | "error">("ready");

  useEffect(() => {
    if (!sessionStorage.getItem("robiagent-chat-launcher-seen")) {
      track("chat_launcher_seen");
      sessionStorage.setItem("robiagent-chat-launcher-seen", "1");
    }
  }, []);

  const launch = async () => {
    if (state === "loading" || state === "loaded") return;
    setState("loading");
    track("chat_launcher_clicked");

    const mount = mountRef.current;
    if (!mount) return;
    if (!mount.firstChild) {
      const widget = document.createElement("div");
      widget.className = WIDGET_ID;
      mount.appendChild(widget);
    }

    try {
      await loadPlatform();
      const rendered = () => {
        const widget = mount.querySelector(`.${WIDGET_ID}`);
        return Boolean(
          widget?.childElementCount || document.querySelector(WIDGET_RENDERED_SELECTOR),
        );
      };
      if (rendered()) {
        setState("loaded");
        track("chatbot_loaded");
        return;
      }

      const observer = new MutationObserver(() => {
        if (rendered()) {
          observer.disconnect();
          setState("loaded");
          track("chatbot_loaded");
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      window.setTimeout(() => {
        observer.disconnect();
        setState((current) => {
          if (current === "loaded") return current;
          track("chatbot_load_failed");
          return "error";
        });
      }, 25000);
    } catch {
      track("chatbot_load_failed");
      setState("error");
    }
  };

  return (
    <>
      <div ref={mountRef} aria-live="polite" />
      {state !== "loaded" && (
        <button
          type="button"
          className="robiagent-chat-launcher"
          onClick={launch}
          disabled={state === "loading"}
          aria-label="Ask RobiAgent for product selection, design-in, or technical support"
        >
          <span className="robiagent-chat-launcher__icon" aria-hidden="true">✦</span>
          <span>
            <strong>{state === "loading" ? "Connecting…" : "Ask RobiAgent"}</strong>
            <small>{state === "error" ? "Unable to connect — try again" : "Product selection · Design-in · Technical support"}</small>
          </span>
        </button>
      )}
    </>
  );
}
