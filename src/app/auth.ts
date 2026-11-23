"use client";

// 목업: 실제 인증/DB 연동 시 signIn·signOut 구현만 교체한다. 세션 읽기(getUser·useUser)는 그대로 둔다.

import { useSyncExternalStore } from "react";

export type User = { id: string; name: string };

const KEY = "kammer:session";
const EVENT = "kammer:auth";
const DEMO = { id: "demo", password: "kammer1234", user: { id: "demo", name: "데모 회원" } };

const save = (user: User | null) => {
  try {
    if (user) localStorage.setItem(KEY, JSON.stringify(user));
    else localStorage.removeItem(KEY);
  } catch {}
  dispatchEvent(new CustomEvent(EVENT, { detail: user }));
};

export async function signIn(
  id: string,
  password: string,
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  await new Promise((r) => setTimeout(r, 400));
  if (!id.trim() || !password) return { ok: false, error: "아이디와 비밀번호를 모두 입력해 주세요." };
  if (id.trim() !== DEMO.id || password !== DEMO.password)
    return { ok: false, error: "아이디 또는 비밀번호가 맞지 않습니다." };
  save(DEMO.user);
  return { ok: true, user: DEMO.user };
}

export function signOut(): void {
  save(null);
}

// useSyncExternalStore는 같은 값이면 같은 참조를 요구하므로 원문 문자열 기준으로 캐시한다.
let cachedRaw: string | null = null;
let cachedUser: User | null = null;

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {}
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      const u = raw ? JSON.parse(raw) : null;
      cachedUser = u && typeof u.id === "string" && typeof u.name === "string" ? { id: u.id, name: u.name } : null;
    } catch {
      cachedUser = null;
    }
  }
  return cachedUser;
}

const subscribe = (onChange: () => void) => {
  addEventListener(EVENT, onChange);
  addEventListener("storage", onChange);
  return () => {
    removeEventListener(EVENT, onChange);
    removeEventListener("storage", onChange);
  };
};

export function useUser(): User | null {
  return useSyncExternalStore(subscribe, getUser, () => null);
}
