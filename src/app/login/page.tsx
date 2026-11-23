import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./LoginForm";
import "./login.css";

export const metadata: Metadata = {
  title: "로그인 — kammer",
};

export default function LoginPage() {
  return (
    <main className="login-page">
      <Link className="login-page__mark" href="/">kammer</Link>
      <div className="login-page__card">
        <h1 className="login-page__title">로그인</h1>
        <LoginForm />
      </div>
    </main>
  );
}
