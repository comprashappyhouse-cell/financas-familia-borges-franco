"use client";

import { useEffect } from "react";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const register = () => navigator.serviceWorker.register("/sw.js").then((registration) => {
      void registration.update();
      const timer = window.setInterval(() => void registration.update(), 60 * 60 * 1000);
      return () => window.clearInterval(timer);
    }).catch(() => undefined);
    let cleanup: (() => void) | undefined;
    void register().then((result) => { cleanup = result; });
    return () => cleanup?.();
  }, []);
  return null;
}
