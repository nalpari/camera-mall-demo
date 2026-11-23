import type { Metadata } from "next";
import { EB_Garamond, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({
  variable: "--font-latin",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const serifKr = Noto_Serif_KR({
  variable: "--font-kr",
  weight: ["400", "500"],
  preload: false,
});

export const metadata: Metadata = {
  title: "kammer — 분해해 보고 파는 카메라",
  description:
    "kammer는 모든 바디와 렌즈를 부품 단위까지 분해해 검수한 뒤 다시 조립해 보내는 고급 카메라 편집숍입니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${garamond.variable} ${serifKr.variable}`}>
      <body>{children}</body>
    </html>
  );
}
