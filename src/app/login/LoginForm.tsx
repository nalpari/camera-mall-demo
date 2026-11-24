"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useUser } from "../auth";

type Status = "idle" | "pending" | "success";

export default function LoginForm() {
  const user = useUser();
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState<{ id?: boolean; password?: boolean }>({});
  const [show, setShow] = useState(false);
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  // 로그인 직후에도 user가 생기므로, 이동이 끝날 때까지는 폼을 그대로 둔다.
  if (user && status !== "success") {
    return (
      <div className="login-page__done">
        <p>{user.name}님, 이미 로그인되어 있습니다.</p>
        <Link className="btn btn--accent" href="/">홈으로 가기</Link>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    const form = new FormData(e.currentTarget);
    const id = String(form.get("id") ?? "");
    const password = String(form.get("password") ?? "");

    const empty = { id: !id.trim(), password: !password };
    if (empty.id || empty.password) {
      setInvalid(empty);
      setError(
        empty.id && empty.password
          ? "아이디와 비밀번호를 입력해 주세요."
          : empty.id
            ? "아이디를 입력해 주세요."
            : "비밀번호를 입력해 주세요.",
      );
      (empty.id ? idRef : pwRef).current?.focus();
      return;
    }

    setInvalid({});
    setError("");
    setStatus("pending");
    const res = await signIn(id, password);
    if (res.ok) {
      setStatus("success");
      router.replace("/");
      return;
    }
    setStatus("idle");
    setError(res.error);
    pwRef.current?.select();
  }

  const label = status === "pending" ? "확인하는 중…" : status === "success" ? "홈으로 이동하는 중…" : "로그인";

  return (
    <form className="login-page__form" onSubmit={onSubmit} noValidate>
      <div className="login-page__field">
        <label htmlFor="login-id">아이디</label>
        <input
          ref={idRef}
          id="login-id"
          name="id"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          aria-invalid={invalid.id || undefined}
          aria-describedby={invalid.id ? "login-error" : undefined}
          onInput={() => invalid.id && setInvalid((v) => ({ ...v, id: false }))}
        />
      </div>

      <div className="login-page__field">
        <label htmlFor="login-password">비밀번호</label>
        <div className="login-page__pw">
          <input
            ref={pwRef}
            id="login-password"
            name="password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            aria-invalid={invalid.password || undefined}
            aria-describedby={invalid.password ? "login-error" : undefined}
            onInput={() => invalid.password && setInvalid((v) => ({ ...v, password: false }))}
          />
          <button
            type="button"
            className="login-page__toggle"
            aria-controls="login-password"
            onClick={() => setShow((v) => !v)}
          >
            {show ? "숨기기" : "보기"}
            <span className="sr-only"> 비밀번호</span>
          </button>
        </div>
      </div>

      <p id="login-error" className="login-page__error" role="alert">
        {error}
      </p>

      <button type="submit" className="btn btn--accent login-page__submit" disabled={status !== "idle"}>
        {label}
      </button>

      <p className="login-page__demo">
        데모 계정으로 둘러보세요. 아이디 <strong>demo</strong>, 비밀번호 <strong>kammer1234</strong>
      </p>
    </form>
  );
}
