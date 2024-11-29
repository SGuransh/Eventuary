"use client";

import { useState, useCallback } from "react";

const CLIENT_ID = "21671359133-179985n0lpab0l54j8b1gvscup3pkjqj.apps.googleusercontent.com";
const REDIRECT_URI = "https://localhost:3000/google-auth-callback";

export function useGoogleAuth() {
  const [authCode, setAuthCode] = useState<string | null>(null);

  const startAuth = useCallback(() => {
    fetch("https://h2x1o1r232.execute-api.us-west-2.amazonaws.com/default/GoogleCall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "start_auth" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.auth_url) {
          const popup = window.open(data.auth_url, "Google Calendar Auth", "width=600,height=600");
          const messageHandler = (event: MessageEvent) => {
            if (event.origin === window.location.origin && event.data.authCode) {
              setAuthCode(event.data.authCode);
              popup?.close();
              window.removeEventListener("message", messageHandler); // Clean up
            }
          };
          window.addEventListener("message", messageHandler);
        }
      })
      .catch((error) => console.error("Error starting auth:", error));
  }, []);

  return { authCode, startAuth };
}