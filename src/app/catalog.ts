// 샘플 카탈로그 — 출시 전 실제 재고/가격으로 교체
export type Item = {
  id: string;
  kind: "body" | "lens";
  name: string;
  note: string;
  price: number;
  grams: number;
  img: string;
  dot: string;
  fixedLens?: boolean;
};

export const catalog: Item[] = [
  { id: "k1", kind: "body", name: "K1 레인지파인더", note: "실버 크롬, 셔터 4,120회", price: 4880000, grams: 670, img: "/media/p-range.webp", dot: "#b9b6b1" },
  { id: "z7", kind: "body", name: "Z7 미러리스", note: "블랙 아노다이징, 셔터 2,310회", price: 3450000, grams: 610, img: "/media/a1.webp", dot: "#2a2928" },
  { id: "m4", kind: "body", name: "M4 중형 포맷", note: "그래파이트, 센서 1억 화소", price: 9240000, grams: 1020, img: "/media/p-medium.webp", dot: "#6d6a66" },
  { id: "c2", kind: "body", name: "C2 컴팩트", note: "28mm 고정 렌즈, 주머니 크기", price: 2190000, grams: 350, img: "/media/p-compact.webp", dot: "#1d1c1b", fixedLens: true },
  { id: "l50", kind: "lens", name: "50mm f/1.2", note: "조리개 날 11매, 광축 재정렬", price: 2640000, grams: 590, img: "/media/p-lens.webp", dot: "#2a2928" },
  { id: "l35", kind: "lens", name: "35mm f/1.4", note: "헤이즈 없음, 초점 링 토크 조정", price: 1980000, grams: 420, img: "/media/p-lens.webp", dot: "#2a2928" },
  { id: "l90", kind: "lens", name: "90mm f/2", note: "인물용, 경통 실링 교체", price: 2310000, grams: 640, img: "/media/p-lens.webp", dot: "#b9b6b1" },
];

export const won = (n: number) => "₩" + n.toLocaleString("ko-KR");
