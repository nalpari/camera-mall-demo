/* eslint-disable @next/next/no-img-element */
import Hero from "./Hero";
import Motion from "./Motion";
import { Header, Kit, ShowcaseActions } from "./Shop";

const sheet = [
  {
    group: "바디",
    items: [
      ["셔터 작동 시험", "150,000회", "실사용 수명만큼 끊어 보고, 노출 오차가 1/3스톱을 넘으면 셔터 유닛을 교체합니다."],
      ["센서 픽셀 맵", "전수 측정", "핫픽셀과 데드픽셀을 한 장씩 기록해 리포트에 첨부합니다."],
      ["마운트 평탄도", "±5μm", "마운트를 떼어 평면도를 재고, 기준을 넘으면 심을 다시 넣습니다."],
      ["방진 실링", "새것으로 교체", "다이얼과 도어의 고무 실링을 모두 갈아 끼웁니다."],
    ],
  },
  {
    group: "렌즈",
    items: [
      ["광축 재정렬", "전 매수", "모든 유리 알을 꺼내 세척하고 광축을 다시 맞춥니다."],
      ["조리개 날", "세척·주유", "기름 번짐이 없는지 조리개를 50번 여닫아 확인합니다."],
      ["곰팡이·헤이즈", "투과광 검사", "강한 빛을 통과시켜 안개와 곰팡이 흔적을 찾습니다."],
    ],
  },
  {
    group: "출고",
    items: [
      ["검수 리포트", "동봉", "측정값과 교체한 부품 목록을 한 장에 적습니다."],
      ["보증", "24개월", "저희가 만진 부품은 2년 동안 무상으로 다시 고칩니다."],
      ["배송", "무료, 이틀", "충격 흡수 상자에 담아 직접 포장합니다."],
    ],
  },
];

export default function Home() {
  return (
    <>
      <Motion />
      <Header />
      <main id="top">
        <Hero />

        <section id="showcase" className="showcase" data-reveal-group>
          <div className="showcase__plate" data-reveal>
            <img src="/media/p-range.webp" alt="실버 크롬 상판의 K1 레인지파인더 카메라" width={1280} height={1600} loading="lazy" />
          </div>
          <div className="showcase__text" data-reveal>
            <ShowcaseActions />
          </div>
        </section>

        <section id="inspection" className="inspection" data-reveal-group>
          <div className="sheet" data-reveal>
            <h2>검수 항목표</h2>
            {sheet.map((g) => (
              <div className="sheet__group" key={g.group}>
                <h3>{g.group}</h3>
                <dl>
                  {g.items.map(([name, value, desc]) => (
                    <div className="sheet__item" key={name}>
                      <dt>{name}</dt>
                      <dd className="sheet__value">{value}</dd>
                      <dd className="sheet__desc">{desc}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <figure className="inspection__photo" data-reveal>
            <img src="/media/d-atelier.webp" alt="흰 면장갑을 낀 기술자가 센서가 드러난 카메라 바디를 들고 있는 작업대" width={1600} height={1067} loading="lazy" />
            <figcaption>센서를 드러낸 채 픽셀 맵을 재기 직전의 바디.</figcaption>
          </figure>
        </section>

        <section id="kit" className="kit-section" aria-labelledby="kit-title" data-reveal-group>
          <Kit />
        </section>

        <section id="atelier" className="letter" data-reveal-group>
          <div className="letter__col">
            <img className="letter__face" src="/media/d-atelier.webp" alt="" width={44} height={44} loading="lazy" data-reveal />
            <h2 data-reveal>아틀리에에서 온 편지</h2>
            <div data-reveal>
              <p>카메라라는 말은 라틴어로 ‘방’이라는 뜻입니다. 빛이 들어오는 작은 어두운 방. 저희 가게 이름 kammer도 거기서 왔습니다.</p>
              <p>그 방이 제대로 닫혀 있는지는 열어 보기 전에는 알 수 없습니다. 그래서 저희는 들여온 카메라를 한 대도 빠짐없이 엽니다. 나사 하나, 실링 하나까지 풀어 작업대 위에 늘어놓습니다.</p>
              <p>대부분은 멀쩡합니다. 그래도 열 대 중 두세 대에서 지친 셔터나 흐려진 렌즈 한 알을 찾아냅니다. 그 두세 대 때문에 나머지 일곱 대도 엽니다.</p>
              <p>다시 조립한 카메라는 제가 직접 한 롤을 찍어 본 뒤에 상자에 넣습니다. 그 사진 한 장을 리포트 뒷면에 붙여 보내 드립니다.</p>
            </div>
            <p className="letter__sign" data-reveal>한도윤<span>kammer 수석 기술자</span></p>
          </div>
        </section>

        <section className="closing" data-reveal-group>
          <img src="/media/d-dial.webp" alt="널링 가공된 은색 셔터 다이얼과 셔터 버튼" width={1600} height={1067} loading="lazy" />
          <div className="closing__text">
            <h2 data-reveal>직접 보고 고르세요</h2>
            <p data-reveal>서촌 아틀리에에서 분해 과정을 보면서 카메라를 고를 수 있습니다. 한 번에 한 분만 모십니다.</p>
            <a data-reveal className="btn btn--paper" href="mailto:atelier@kammer.example?subject=%EB%B0%A9%EB%AC%B8%20%EA%B2%80%EC%88%98%20%EC%98%88%EC%95%BD&body=%ED%9D%AC%EB%A7%9D%20%EB%82%A0%EC%A7%9C%3A%0A%EB%B3%B4%EA%B3%A0%20%EC%8B%B6%EC%9D%80%20%EC%B9%B4%EB%A9%94%EB%9D%BC%3A">방문 검수 예약하기</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__photo">
          <img src="/media/d-aperture.webp" alt="렌즈 안쪽 조리개 날이 원형으로 모인 모습" width={1600} height={1067} loading="lazy" />
        </div>
        <div className="footer__menu">
          <p className="footer__mark">kammer</p>
          <h2 className="sr-only">사이트 메뉴</h2>
          <ul>
            <li><a href="#showcase">이달의 바디</a></li>
            <li><a href="#inspection">검수 항목표</a></li>
            <li><a href="#kit">키트 만들기</a></li>
            <li><a href="#atelier">아틀리에</a></li>
            <li><a href="mailto:atelier@kammer.example">문의하기</a></li>
          </ul>
          <div className="footer__info">
            <p>서울 종로구 자하문로 00<br />화–토 11:00–19:00, 예약제</p>
            <p>atelier@kammer.example<br />02-000-0000</p>
          </div>
          <p className="footer__legal">© 2026 kammer. 모든 카메라는 분해 검수 후 판매됩니다.</p>
        </div>
      </footer>
    </>
  );
}
