import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd, articleJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '알바생 노동법 권리 총정리 2026',
  description:
    '아르바이트 근로자의 최저임금, 주휴수당, 근로계약서, 부당해고·임금체불 신고 방법, 퇴직금 조건까지 알바생이 꼭 알아야 할 노동법 권리를 정리했습니다.',
  path: '/guide/part-time-rights',
  type: 'article',
  keywords: [
    '알바 노동법',
    '알바 권리',
    '알바 최저임금',
    '알바 주휴수당',
    '알바 근로계약서',
    '알바 부당해고',
    '알바 임금체불',
    '알바 퇴직금',
    '아르바이트 노동법',
    '알바 신고 방법',
  ],
});

export default function GuidePartTimeRightsPage() {
  return (
    <>
    <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '알바생 노동법 권리', path: '/guide/part-time-rights' }])} />
    <JsonLd data={articleJsonLd({ title: '알바생 노동법 권리 총정리 2026', description: '아르바이트 근로자의 최저임금, 주휴수당, 근로계약서, 부당해고·임금체불 신고 방법, 퇴직금 조건까지 알바생이 꼭 알아야 할 노동법 권리를 정리했습니다.', path: '/guide/part-time-rights', datePublished: '2026-04-06', dateModified: '2026-04-06' })} />
    <main id="main-content" className="page-shell">
      <section className="section">
        <div className="section__header">
          <span className="eyebrow">guide · 2026</span>
          <h1 className="page-title">알바생 노동법 권리 총정리</h1>
          <p className="page-lead">
            아르바이트도 근로기준법이 적용되는 정식 근로자입니다.
            최저임금, 주휴수당, 근로계약서, 부당해고 대응까지 알바생이 반드시 알아야 할 권리를 정리합니다.
          </p>
        </div>

        <div className="panel">
          <div className="panel__head"><div><h2>핵심 요약</h2></div></div>
          <ul className="plain-list">
            <li><strong>2026년 최저시급:</strong> 10,320원 (이보다 적으면 위법)</li>
            <li><strong>주휴수당:</strong> 주 15시간 이상 + 개근하면 지급 의무</li>
            <li><strong>근로계약서:</strong> 반드시 서면 작성·교부 (미작성 시 사업주 벌금)</li>
            <li><strong>퇴직금:</strong> 1년 이상 + 주 15시간 이상 근무 시 발생</li>
            <li><strong>임금체불:</strong> 고용노동부(1350) 신고 가능</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>최저임금 — 이보다 적으면 위법입니다</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>2026년 최저임금</h3>
            <p>
              <strong>시급 10,320원</strong>이 법정 최저임금입니다.
              월급으로 환산하면 주 40시간 기준(유급주휴 포함 209시간)
              <strong>월 2,156,880원</strong>입니다.
              최저임금 미만으로 급여를 지급하면 사업주에게
              3년 이하 징역 또는 2,000만 원 이하 벌금이 부과됩니다.
            </p>
          </article>
          <article className="value-card">
            <h3>최저임금에 포함되는 것과 안 되는 것</h3>
            <p>
              기본급과 고정적으로 지급되는 수당은 포함됩니다.
              하지만 다음 항목은 최저임금 산입에서 제외됩니다:
              연장·야간·휴일 근로 가산수당, 상여금 중 월 환산액의 5% 초과분,
              식비·교통비 등 복리후생비 중 월 환산액의 1% 초과분.
            </p>
          </article>
          <article className="value-card">
            <h3>수습 감액</h3>
            <p>
              1년 이상 근로계약을 체결한 경우, 수습 3개월까지 최저임금의 90%(9,288원)를 지급할 수 있습니다.
              단, 단순노무직은 감액 불가합니다.
              대부분의 단기 아르바이트는 1년 미만 계약이므로 감액 대상이 아닙니다.
            </p>
          </article>
          <article className="value-card">
            <h3>최저임금 미달 확인법</h3>
            <p>
              시급제라면 시급이 10,320원 이상인지 바로 확인됩니다.
              월급제라면 (월급 - 비산입 항목) ÷ 월 소정근로시간(주휴 포함)으로 역산합니다.
              역산한 시급이 10,320원 미만이면 최저임금 위반입니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>주휴수당 — 알바도 받을 수 있습니다</h2>
        </div>
        <div className="panel">
          <div className="panel__head"><div><h3>주휴수당 지급 조건</h3></div></div>
          <ul className="plain-list">
            <li><strong>조건 1:</strong> 1주 소정근로시간 15시간 이상</li>
            <li><strong>조건 2:</strong> 해당 주의 소정 근로일 개근</li>
          </ul>
          <p style={{ marginTop: '0.5rem' }}>
            이 두 조건을 충족하면 정규직이든 알바든 관계없이 주휴수당이 발생합니다.
          </p>
          <hr className="divider" />
          <p><strong>계산 예시</strong> — 주 5일, 하루 4시간, 시급 10,320원</p>
          <ul className="plain-list">
            <li>주당 소정근로시간: 20시간 (15시간 이상 → 조건 충족)</li>
            <li>1일 소정근로시간: 20시간 ÷ 5일 = 4시간</li>
            <li>주휴수당: 4시간 x 10,320원 = 41,280원/주</li>
            <li>주휴수당 포함 실질 시급: 10,320원 x (24시간/20시간) = 12,384원</li>
          </ul>
          <hr className="divider" />
          <p><strong>주의:</strong> 많은 사업장에서 알바 주휴수당을 지급하지 않습니다.
            시급에 주휴수당이 포함되어 있다면 근로계약서에 명시되어 있어야 합니다.
            명시되지 않았다면 별도 청구할 수 있습니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>근로계약서 — 반드시 작성해야 합니다</h2>
        </div>
        <div className="panel">
          <div className="panel__head"><div><h3>근로계약서 필수 기재 항목</h3></div></div>
          <ul className="plain-list">
            <li>임금 (시급 또는 월급, 지급일, 지급 방법)</li>
            <li>소정근로시간 (출퇴근 시간, 주당 근무일수)</li>
            <li>휴일 (주휴일, 공휴일 처리)</li>
            <li>연차 유급휴가</li>
            <li>근로 장소와 업무 내용</li>
            <li>근로계약 기간 (정함이 있는 경우)</li>
          </ul>
          <hr className="divider" />
          <p>
            <strong>단시간 근로자(알바)는 추가 기재 항목이 있습니다:</strong> 근로일별 근로시간.
            예를 들어 &ldquo;월·수·금 14:00~18:00&rdquo; 같은 식으로 구체적으로 기재해야 합니다.
          </p>
        </div>

        <div className="panel" style={{ marginTop: '1rem' }}>
          <div className="panel__head"><div><h3>근로계약서를 안 써줬다면?</h3></div></div>
          <p>
            사업주가 근로계약서를 서면으로 작성·교부하지 않으면 <strong>500만 원 이하의 벌금</strong>이 부과됩니다.
            근로계약서가 없더라도 실제로 일한 사실이 있으면 근로관계는 성립합니다.
          </p>
          <p><strong>대처 방법:</strong></p>
          <ol className="plain-list">
            <li>사업주에게 서면 근로계약서 작성을 요청합니다 (카톡, 문자 등 기록 남기기).</li>
            <li>거부하면 고용노동부(1350)에 신고합니다.</li>
            <li>출퇴근 기록, 급여이체 내역, 업무 지시 카톡 등을 증거로 보관합니다.</li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>부당해고 — 갑자기 잘리면 어떻게 해야 하나?</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>해고 예고 의무</h3>
            <p>
              3개월 이상 근무한 근로자를 해고하려면 30일 전에 예고하거나,
              30일분의 통상임금(해고 예고 수당)을 지급해야 합니다.
              3개월 미만 근로자, 2개월 이내 기간제 근로자, 일용직은 예외입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>부당해고 구제 신청</h3>
            <p>
              5인 이상 사업장에서 정당한 사유 없이 해고된 경우,
              해고일로부터 3개월 이내에 지방노동위원회에 구제 신청을 할 수 있습니다.
              부당해고로 인정되면 복직 또는 해고 기간 임금 지급 명령이 내려집니다.
            </p>
          </article>
          <article className="value-card">
            <h3>5인 미만 사업장</h3>
            <p>
              5인 미만 사업장에는 해고 제한 규정(근로기준법 제23조)이 적용되지 않습니다.
              하지만 최저임금, 근로계약서 교부, 임금 지급 의무 등은 동일하게 적용됩니다.
              부당한 해고라도 임금체불이 있다면 고용노동부에 신고할 수 있습니다.
            </p>
          </article>
          <article className="value-card">
            <h3>해고 통보를 받았다면</h3>
            <p>
              해고 사유와 날짜를 서면(문자, 이메일 등)으로 받아두세요.
              구두 해고만으로는 부당해고 입증이 어려울 수 있습니다.
              해고 후 밀린 급여가 있다면 14일 이내에 지급받아야 합니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>임금체불 — 급여를 안 주거나 늦게 줄 때</h2>
        </div>
        <div className="panel">
          <div className="panel__head"><div><h3>임금체불 신고 절차</h3></div></div>
          <ol className="plain-list">
            <li><strong>증거 확보:</strong> 근로계약서, 급여이체 내역, 출퇴근 기록, 업무 지시 메시지를 모읍니다.</li>
            <li><strong>사업주에게 독촉:</strong> 임금 지급을 요청하는 내용을 문자나 이메일로 보냅니다 (증거용).</li>
            <li><strong>고용노동부 신고:</strong> 전화(1350), 방문, 또는 고용노동부 홈페이지에서 진정서를 제출합니다.</li>
            <li><strong>근로감독관 조사:</strong> 신고 접수 후 근로감독관이 사업장을 조사합니다.</li>
            <li><strong>체불 확인 시:</strong> 사업주에게 시정 명령. 불이행 시 형사 처벌(3년 이하 징역 또는 3,000만 원 이하 벌금).</li>
          </ol>
          <hr className="divider" />
          <p>
            임금 청구 소멸시효는 <strong>3년</strong>입니다.
            3년이 지난 급여는 법적으로 청구할 수 없으므로 체불이 발생하면 빠르게 대응하세요.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>퇴직금 — 알바도 받을 수 있다</h2>
        </div>
        <div className="panel">
          <div className="panel__head"><div><h3>퇴직금 수급 조건</h3></div></div>
          <ul className="plain-list">
            <li><strong>조건 1:</strong> 계속 근로 기간 1년 이상</li>
            <li><strong>조건 2:</strong> 주 평균 근로시간 15시간 이상</li>
          </ul>
          <p style={{ marginTop: '0.5rem' }}>
            이 두 조건을 모두 충족하면 아르바이트, 계약직, 파트타임 구분 없이 퇴직금을 받을 수 있습니다.
            예를 들어 편의점에서 1년 넘게 주 20시간씩 일했다면 퇴직금 대상입니다.
          </p>
          <hr className="divider" />
          <p><strong>퇴직금 계산:</strong> 1일 평균임금 x 30일 x (재직일수 ÷ 365)</p>
          <p>
            평균임금은 퇴직 전 3개월간 받은 총 임금(주휴수당 포함)을 그 기간의 총 일수로 나눈 금액입니다.
            퇴직금은 퇴직 후 14일 이내에 지급해야 합니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>알바생이 자주 겪는 문제와 대응</h2>
        </div>
        <div className="panel">
          <ul className="plain-list">
            <li>
              <strong>&ldquo;시급에 주휴수당 포함&rdquo;이라는데?</strong> →
              근로계약서에 주휴수당 포함 여부와 산정 방식이 명확히 기재되어 있어야 합니다.
              구두로만 말한 것은 인정되지 않습니다.
            </li>
            <li>
              <strong>&ldquo;벌금을 급여에서 공제한다&rdquo;?</strong> →
              지각, 물품 파손 등을 이유로 급여에서 벌금을 공제하는 것은 원칙적으로 위법입니다.
              근로기준법 제43조에 따라 임금 전액을 지급해야 합니다.
            </li>
            <li>
              <strong>&ldquo;대타를 구해야 그만둘 수 있다&rdquo;?</strong> →
              대타를 구하는 것은 사업주의 의무이지 근로자의 의무가 아닙니다.
              근로자는 퇴사 의사를 통보하면 됩니다.
            </li>
            <li>
              <strong>야간·연장·휴일 근로 가산수당</strong> →
              5인 이상 사업장에서 야간(22시~06시) 근로 시 통상임금의 50% 가산,
              연장근로(1주 40시간, 1일 8시간 초과) 시 50% 가산,
              휴일근로 시 50%(8시간 이내) 또는 100%(8시간 초과) 가산.
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>도움을 받을 수 있는 곳</h2>
        </div>
        <div className="panel">
          <ul className="plain-list">
            <li><strong>고용노동부 상담센터:</strong> 전화 1350 (평일 9~18시)</li>
            <li><strong>청소년근로권익센터:</strong> 전화 1644-3119 (만 24세 이하 청년·청소년 대상 무료 상담)</li>
            <li><strong>대한법률구조공단:</strong> 전화 132 (무료 법률 상담)</li>
            <li><strong>고용노동부 온라인 민원:</strong> minwon.moel.go.kr (진정서 온라인 제출)</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>관련 계산기 · 가이드</h2>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/minimum-wage" style={{ textDecoration: 'none' }}>
            <h3>최저임금 계산기</h3>
            <p>2026년 최저임금(10,320원) 기준으로 미달 여부를 점검합니다.</p>
          </Link>
          <Link className="value-card" href="/weekly-holiday" style={{ textDecoration: 'none' }}>
            <h3>주휴수당 계산기</h3>
            <p>시급과 주당 근로시간으로 주휴수당을 계산합니다.</p>
          </Link>
          <Link className="value-card" href="/guide/probation" style={{ textDecoration: 'none' }}>
            <h3>수습기간 급여와 권리</h3>
            <p>수습기간 감액 기준과 해고 조건을 정리했습니다.</p>
          </Link>
          <Link className="value-card" href="/guide/contract-types" style={{ textDecoration: 'none' }}>
            <h3>근로계약 유형별 차이</h3>
            <p>정규직·계약직·파견직·프리랜서의 차이를 비교합니다.</p>
          </Link>
        </div>
      </section>
      <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-3, #94a3b8)', margin: '2rem 0 0' }}>
        마지막 업데이트: 2026-04-06 · 2026년 기준 법령 반영
      </p>
    </main>
    </>
  );
}
