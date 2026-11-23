"use client";

import { useEffect } from "react";

// 섹션마다 [data-reveal] 자식이 순서대로 떠오른다. 스크립트가 없으면 아무것도 숨기지 않는다.
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("motion");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
            el.style.transitionDelay = `${i * 80}ms`;
            el.classList.add("is-in");
          });
          io.unobserve(e.target);
        }
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll("[data-reveal-group]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return null;
}
