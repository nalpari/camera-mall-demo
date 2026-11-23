"use client";

import { useEffect, useState } from "react";
import { catalog, won, type Item } from "./catalog";

const addToCart = (n = 1) => dispatchEvent(new CustomEvent("kammer:cart", { detail: n }));

export function Header() {
  const [count, setCount] = useState(0);
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const onAdd = (e: Event) => setCount((c) => c + (e as CustomEvent<number>).detail);
    const onScroll = () => {
      const hero = document.querySelector(".hero");
      setOnLight(!!hero && hero.getBoundingClientRect().bottom < 64);
    };
    addEventListener("kammer:cart", onAdd);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      removeEventListener("kammer:cart", onAdd);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={`nav${onLight ? " nav--light" : ""}`}>
      <a className="nav__mark" href="#top">kammer</a>
      <nav aria-label="주요 메뉴">
        <a href="#showcase">이달의 바디</a>
        <a href="#inspection">검수 항목</a>
        <a href="#kit">키트 만들기</a>
        <a href="#atelier">아틀리에</a>
        <a className="nav__cart" href="#kit" aria-live="polite">장바구니 {count}</a>
      </nav>
    </header>
  );
}

const editions = [
  { id: "body", label: "바디만", add: 0 },
  { id: "35", label: "35mm 포함", add: 1980000 },
  { id: "50", label: "50mm 포함", add: 2640000 },
];

export function ShowcaseActions() {
  const [ed, setEd] = useState("body");
  const price = 4880000 + editions.find((e) => e.id === ed)!.add;
  return (
    <>
      <div className="tabs" role="radiogroup" aria-label="구성">
        {editions.map((e) => (
          <button
            key={e.id}
            role="radio"
            aria-checked={ed === e.id}
            className="tab"
            onClick={() => setEd(e.id)}
          >
            {e.label}
          </button>
        ))}
      </div>
      <div className="showcase__body">
        <h2>K1 레인지파인더</h2>
        <p>
          1950년대 거리 사진가들이 쓰던 방식 그대로, 초점을 이중상으로 맞춥니다. 이 한 대는
          셔터를 4,120번만 끊었고, 저희 아틀리에에서 거리계를 다시 맞춘 뒤 실링을 모두 새것으로
          바꿨습니다.
        </p>
        <p className="showcase__price">{won(price)}</p>
      </div>
      <div className="cells">
        <button className="cell cell--ink" onClick={() => addToCart()}>장바구니에 담기</button>
        <a className="cell cell--tone" href="#inspection">검수 리포트 보기</a>
      </div>
    </>
  );
}

function Row({
  item, checked, disabled, onPick,
}: { item: Item; checked: boolean; disabled?: boolean; onPick: () => void }) {
  return (
    <label className={`row${disabled ? " row--off" : ""}`}>
      <input type="radio" name={item.kind} checked={checked} disabled={disabled} onChange={onPick} />
      <span className="row__dot" style={{ background: item.dot }} aria-hidden="true" />
      <span className="row__name">
        {item.name}
        <span className="row__note">{item.note}</span>
      </span>
      <span className="row__value">{won(item.price)}</span>
    </label>
  );
}

export function Kit() {
  const bodies = catalog.filter((i) => i.kind === "body");
  const lenses = catalog.filter((i) => i.kind === "lens");
  const [bodyId, setBodyId] = useState("z7");
  const [lensId, setLensId] = useState<string | null>("l50");
  const [shown, setShown] = useState<Item>(bodies[1]);
  const [added, setAdded] = useState(false);

  const body = bodies.find((b) => b.id === bodyId)!;
  const lens = body.fixedLens ? null : lenses.find((l) => l.id === lensId) ?? null;
  const total = body.price + (lens?.price ?? 0);
  const grams = body.grams + (lens?.grams ?? 0);

  return (
    <div className="kit">
      <div className="kit__stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={shown.img} src={shown.img} alt={shown.name} className="kit__img" />
        <p className="kit__caption">{shown.name} — {shown.note}</p>
      </div>

      <div className="kit__list">
        <h2 id="kit-title">지금 입고된 카메라</h2>
        <p className="kit__lead">바디와 렌즈를 하나씩 고르면, 함께 검수해 한 상자로 보냅니다.</p>

        <fieldset>
          <legend>바디</legend>
          {bodies.map((b) => (
            <Row key={b.id} item={b} checked={bodyId === b.id}
              onPick={() => { setBodyId(b.id); setShown(b); setAdded(false); }} />
          ))}
        </fieldset>

        <fieldset>
          <legend>렌즈{body.fixedLens ? " — C2는 렌즈가 고정되어 있습니다" : ""}</legend>
          {lenses.map((l) => (
            <Row key={l.id} item={l} checked={!body.fixedLens && lensId === l.id} disabled={body.fixedLens}
              onPick={() => { setLensId(l.id); setShown(l); setAdded(false); }} />
          ))}
          <label className={`row${body.fixedLens ? " row--off" : ""}`}>
            <input type="radio" name="lens" checked={!body.fixedLens && lensId === null}
              disabled={body.fixedLens} onChange={() => { setLensId(null); setAdded(false); }} />
            <span className="row__dot" style={{ background: "var(--field)" }} aria-hidden="true" />
            <span className="row__name">렌즈 없이</span>
            <span className="row__value">{won(0)}</span>
          </label>
        </fieldset>

        <div className="kit__sum" aria-live="polite">
          <p>
            <span>{body.name}{lens ? ` + ${lens.name}` : ""}</span>
            <strong>{won(total)}</strong>
          </p>
          <p className="kit__meta">무게 {grams.toLocaleString("ko-KR")}g · 검수 리포트와 24개월 보증 포함</p>
          <button className="btn btn--accent" onClick={() => { addToCart(lens ? 2 : 1); setAdded(true); }}>
            {added ? "담았습니다 — 하나 더 담기" : "이 키트 장바구니에 담기"}
          </button>
        </div>
      </div>
    </div>
  );
}
