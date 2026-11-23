"use client";

import { useEffect, useRef } from "react";

const FRAMES = 72; // public/media/frames/f000.webp … f071.webp (분해 방향 영상)
const src = (i: number) => `/media/frames/f${String(i).padStart(3, "0")}.webp`;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

// 스크롤 진행도 → 분해 정도(0 = 조립, 1 = 완전 분해). 처음과 중간, 끝에 잠깐 멈춘다.
function explode(p: number) {
  if (p < 0.08) return 0;
  if (p < 0.42) return (p - 0.08) / 0.34;
  if (p < 0.58) return 1;
  if (p < 0.92) return 1 - (p - 0.58) / 0.34;
  return 0;
}
const chapterOf = (p: number) => (p < 0.14 ? 0 : p > 0.3 && p < 0.66 ? 1 : p > 0.84 ? 2 : -1);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = root.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const imgs: HTMLImageElement[] = [];
    let smooth = 0, last = -1, raf = 0;

    for (let i = 0; i < FRAMES; i++) {
      const im = new Image();
      im.decoding = "async";
      im.src = src(i);
      im.onload = () => {
        if (i === 0) section.classList.add("has-frames");
        last = -1;
        wake();
      };
      imgs.push(im);
    }

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      cv.width = Math.round(cv.clientWidth * dpr);
      cv.height = Math.round(cv.clientHeight * dpr);
      last = -1;
    };

    const draw = (i: number) => {
      // 아직 안 받은 프레임이면 가장 가까운 받은 프레임으로
      let k = i;
      while (k > 0 && !imgs[k].complete) k--;
      const im = imgs[k];
      if (!im.complete || !im.naturalWidth) return;
      ctx.drawImage(im, 0, 0, cv.width, cv.height); // 배치는 CSS(.hero__frame)가 맡는다
    };

    const tick = () => {
      const r = section.getBoundingClientRect();
      const run = r.height - innerHeight;
      const p = run > 0 ? clamp(-r.top / run) : 0;
      smooth = reduce ? p : smooth + (p - smooth) * 0.14;
      section.style.setProperty("--p", smooth.toFixed(4));
      section.dataset.chapter = String(chapterOf(smooth));
      const i = Math.round(explode(smooth) * (FRAMES - 1));
      if (i !== last) {
        draw(i);
        last = i;
      }
      // 따라잡았으면 멈추고, 다음 스크롤에서 다시 깨운다
      raf = Math.abs(p - smooth) > 0.0005 ? requestAnimationFrame(tick) : 0;
    };
    function wake() {
      if (!raf) raf = requestAnimationFrame(tick);
    }
    const onResize = () => { resize(); wake(); };

    resize();
    addEventListener("resize", onResize);
    addEventListener("scroll", wake, { passive: true });
    wake();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", onResize);
      removeEventListener("scroll", wake);
    };
  }, []);

  return (
    <section ref={root} className="hero" data-chapter="0" aria-label="kammer 소개">
      <div className="hero__stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero__frame" src={src(0)} alt="" aria-hidden="true" />
        <canvas ref={canvas} className="hero__frame hero__canvas" aria-hidden="true" />

        <div className="hero__copy">
          <div className="chapter" data-n="0">
            <h1>분해해 보고 파는 카메라</h1>
            <p>
              kammer는 모든 바디와 렌즈를 부품 하나까지 풀어 검수한 뒤, 다시 조립해서 보냅니다.
            </p>
            <a className="btn btn--light" href="#kit">입고된 카메라 보기</a>
          </div>

          <div className="chapter" data-n="1">
            <h2>1,240개 부품을 하나씩</h2>
            <ul className="hero__checks">
              <li><span>셔터 작동 시험</span><span>150,000회</span></li>
              <li><span>센서 픽셀 전수 측정</span><span>2,400만 화소</span></li>
              <li><span>렌즈 광축 재정렬</span><span>11매</span></li>
            </ul>
          </div>

          <div className="chapter" data-n="2">
            <h2>다시 조립해, 당신에게</h2>
            <p>검수 리포트 한 장이 상자 안에 함께 들어갑니다. 보증은 24개월입니다.</p>
            <a className="btn btn--light" href="#inspection">검수 항목표 보기</a>
          </div>
        </div>

        <p className="hero__mark" aria-hidden="true">kammer</p>
      </div>
    </section>
  );
}
