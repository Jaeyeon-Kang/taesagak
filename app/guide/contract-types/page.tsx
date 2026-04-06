import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd, articleJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '근로계약 유형별 차이 2026',
  description:
    '정규직, 계약직, 파견직, 프리랜서의 차이를 비교합니다. 4대보험, 퇴직금, 연차 적용 여부, 계약직 갱신 기대권, 위장 프리랜서 판별법까지 정리했습니다.',
  path: '/guide/contract-types',
  type: 'article',
  keywords: [
    '근로계약 유형',
    '정규직 계약직 차이',
    '파견직 뜻',
    '프리랜서 근로자 차이',
    '위장 프리랜서',
    '계약직 갱신 기대권',
    '기간제 근로자',
    '파견법',
    '근로계약 종류',
    '비정규직 권리',
  ],
});

export default function GuideContractTypesPage() {
  return (
    <>
    <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '근로계약 유형별 차이', path: '/guide/contract-types' }])} />
    <JsonLd data={articleJsonLd({ title: '근로계약 유형별 차이 2026', description: '정규직, 계약직, 파견직, 프리랜서의 차이를 비교합니다. 4대보험, 퇴직금, 연차 적용 여부, 계약직 갱신 기대권, 위장 프리랜서 판별법까지 정리했습니다.', path: '/guide/contract-types', datePublished: '2026-04-06', dateModified: '2026-04-06' })} />
    <main id="main-content" className="page-shell">
      <section className="section">
        <div className="section__header">
          <span className="eyebrow">guide · 2026</span>
          <h1 className="page-title">근로계약 유형별 차이</h1>
          <p className="page-lead">
            같은 일을 해도 계약 형태에 따라 4대보험, 퇴직금, 연차, 해고 보호가 달라집니다.
            정규직·계약직·파견직·프리랜서 각각의 법적 권리와 차이점을 비교합니다.
          </p>
        </div>

        <div className="panel">
          <div className="panel__head"><div><h2>한눈에 보는 비교표</h2></div></div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border, #e2e8f0)' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>항목</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>정규직</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>계약직(기간제)</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>파견직</th>
                  <th style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>프리랜서</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>근로계약 기간</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>정함 없음</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>최대 2년</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>최대 2년</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>프로젝트 단위</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>4대보험</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>적용</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>적용</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>적용 (파견사 기준)</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>미적용 (본인 부담)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>퇴직금</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>1년 이상 시 지급</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>1년 이상 시 지급</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>1년 이상 시 지급 (파견사)</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>없음</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>연차</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>법정 기준 적용</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>법정 기준 적용</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>법정 기준 적용</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>없음</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>해고 보호</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>정당한 사유 필요</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>계약 만료 시 종료</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>파견사 소속</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>계약 해지</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600 }}>원천징수</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>근로소득세</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>근로소득세</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>근로소득세</td>
                  <td style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>사업소득세 3.3%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>유형별 상세 설명</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>정규직</h3>
            <p>
              근로계약 기간의 정함이 없는 근로자입니다.
              가장 강한 고용 보호를 받으며, 정당한 사유 없이 해고할 수 없습니다.
              4대보험, 퇴직금, 연차, 각종 수당이 모두 적용됩니다.
              취업규칙이나 단체협약에 따른 복리후생도 적용 대상입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>계약직 (기간제)</h3>
            <p>
              기간을 정하여 근로계약을 체결한 근로자입니다.
              기간제법에 따라 최대 2년까지 계약할 수 있으며,
              2년을 초과하면 기간의 정함이 없는 근로자(정규직)로 간주됩니다.
              계약 기간 중에는 정당한 사유 없이 해고할 수 없습니다.
              4대보험, 퇴직금, 연차 모두 적용됩니다.
            </p>
          </article>
          <article className="value-card">
            <h3>파견직</h3>
            <p>
              파견사(근로자파견사업체)에 고용되어 사용사업주(실제 일하는 회사)에서 근무하는 형태입니다.
              근로계약은 파견사와 체결하며, 4대보험·퇴직금도 파견사가 부담합니다.
              파견 기간은 원칙적으로 1년, 연장 시 최대 2년입니다.
              2년 초과 시 사용사업주가 직접 고용할 의무가 발생합니다.
            </p>
          </article>
          <article className="value-card">
            <h3>프리랜서 (사업소득자)</h3>
            <p>
              근로계약이 아닌 용역·위임·도급 계약을 체결합니다.
              근로기준법이 적용되지 않으므로 4대보험, 퇴직금, 연차, 최저임금, 해고 보호가 없습니다.
              세금은 사업소득세 3.3%(소득세 3% + 지방소득세 0.3%)가 원천징수됩니다.
              종합소득세 신고를 본인이 직접 해야 합니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>계약직 갱신 기대권</h2>
        </div>
        <div className="panel">
          <div className="panel__head"><div><h3>갱신 기대권이란?</h3></div></div>
          <p>
            계약직 근로자가 계약 만료 후에도 계약이 갱신될 것이라는 합리적인 기대를 가질 수 있는 경우,
            사업주가 합리적 이유 없이 갱신을 거절하면 부당해고로 판단될 수 있습니다.
          </p>
          <hr className="divider" />
          <p><strong>갱신 기대권이 인정되는 경우:</strong></p>
          <ul className="plain-list">
            <li>계약이 여러 차례 반복 갱신된 전례가 있는 경우</li>
            <li>사업주가 구두로 계약 갱신을 약속한 경우</li>
            <li>동일 업무를 수행하는 다른 계약직 근로자가 관행적으로 갱신된 경우</li>
            <li>근로자의 업무가 계속 필요한 것이 객관적으로 명백한 경우</li>
          </ul>
          <hr className="divider" />
          <p><strong>갱신 거절을 통보받았다면:</strong></p>
          <ol className="plain-list">
            <li>계약 갱신에 대한 기대를 갖게 된 근거(이메일, 메시지, 전례 등)를 확보합니다.</li>
            <li>갱신 거절 사유를 서면으로 요청합니다.</li>
            <li>부당하다고 판단되면 지방노동위원회에 구제 신청합니다 (만료일로부터 3개월 이내).</li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>위장 프리랜서 판별법</h2>
        </div>
        <div className="panel">
          <div className="panel__head"><div><h3>프리랜서인데 사실상 근로자?</h3></div></div>
          <p>
            계약서에 &ldquo;프리랜서&rdquo;라고 되어 있더라도 실질적으로 근로자에 해당하면
            근로기준법이 적용됩니다. 계약의 명칭이 아닌 실질적인 관계가 기준입니다.
          </p>
          <hr className="divider" />
          <p><strong>근로자로 판단되는 주요 기준 (대법원 판례):</strong></p>
          <ul className="plain-list">
            <li><strong>업무 지시:</strong> 사용자가 업무 내용, 방법, 시간을 구체적으로 지시하고 감독하는가?</li>
            <li><strong>출퇴근:</strong> 출퇴근 시간이 정해져 있고, 근태 관리를 받는가?</li>
            <li><strong>전속성:</strong> 다른 곳에서 동시에 일할 수 없도록 제한되어 있는가?</li>
            <li><strong>장비·재료:</strong> 업무에 필요한 장비와 재료를 사용자가 제공하는가?</li>
            <li><strong>보수:</strong> 근로의 대가로 정기적·고정적 보수를 받는가?</li>
            <li><strong>대체 가능성:</strong> 본인이 직접 일해야 하며, 다른 사람을 대신 보낼 수 없는가?</li>
          </ul>
          <hr className="divider" />
          <p>
            위 항목 중 다수가 해당된다면 실질적 근로자일 가능성이 높습니다.
            이 경우 4대보험 가입, 퇴직금, 연차, 최저임금 등 근로기준법상의 모든 권리를 주장할 수 있습니다.
          </p>
        </div>

        <div className="panel" style={{ marginTop: '1rem' }}>
          <div className="panel__head"><div><h3>위장 프리랜서라고 판단되면?</h3></div></div>
          <ol className="plain-list">
            <li>고용노동부(1350)에 &ldquo;근로자 지위 확인&rdquo; 진정을 제출합니다.</li>
            <li>근로감독관이 실태를 조사합니다.</li>
            <li>근로자로 인정되면 사업주에게 4대보험 소급 가입, 퇴직금·연차수당 지급 등이 명령됩니다.</li>
            <li>국민연금·건강보험공단에도 직장가입자로 소급 전환 신고가 가능합니다.</li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>파견직 관련 주의사항</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>파견 허용 업무</h3>
            <p>
              파견은 모든 업무에 허용되는 것이 아닙니다.
              제조업 직접 생산 공정, 건설업 현장, 하역, 선원 등은 파견이 금지됩니다.
              파견 대상 업무는 파견법 시행령에서 정한 32개 업무(경비, 청소, 안내, 통역 등)와
              전문지식이 필요한 업무 등으로 제한됩니다.
            </p>
          </article>
          <article className="value-card">
            <h3>불법 파견</h3>
            <p>
              파견 허용 업무가 아닌데 파견 형태로 근로자를 사용하거나,
              파견사가 아닌 업체가 근로자를 다른 업체에 보내 일하게 하면 불법 파견입니다.
              불법 파견이 적발되면 사용사업주가 해당 근로자를 직접 고용해야 합니다.
            </p>
          </article>
          <article className="value-card">
            <h3>2년 초과 시 직접 고용 의무</h3>
            <p>
              파견 기간이 2년을 초과하면 사용사업주가 해당 근로자를 직접 고용해야 합니다.
              이를 위반하면 3,000만 원 이하의 과태료가 부과됩니다.
              근로자는 직접 고용을 요구할 수 있으며, 거부 시 노동위원회에 구제 신청이 가능합니다.
            </p>
          </article>
          <article className="value-card">
            <h3>도급과 파견의 차이</h3>
            <p>
              도급은 일의 완성을 목적으로 하고, 수급인이 독립적으로 업무를 수행합니다.
              파견은 파견 근로자가 사용사업주의 지휘·감독을 받습니다.
              도급이라고 계약했더라도 실질이 파견이면 파견법이 적용됩니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>계약 유형 선택 시 체크리스트</h2>
        </div>
        <div className="panel">
          <ul className="plain-list">
            <li>
              <strong>계약서 명칭보다 실질이 중요합니다.</strong> 프리랜서 계약서라도 실질이 근로자라면
              근로기준법이 적용됩니다.
            </li>
            <li>
              <strong>3.3% 원천징수 = 프리랜서는 아닙니다.</strong> 세금 처리 방식이 고용 형태를 결정하는 것이 아니라,
              실질적인 근무 형태가 기준입니다.
            </li>
            <li>
              <strong>계약직이라도 차별 금지.</strong> 기간제법에 따라 계약직 근로자에 대해
              동일 업무를 수행하는 정규직과 비교하여 불합리한 차별이 금지됩니다.
              차별을 받으면 노동위원회에 시정 신청이 가능합니다.
            </li>
            <li>
              <strong>파견직은 파견사와의 관계를 확인하세요.</strong> 급여, 4대보험, 퇴직금 등의 의무는
              파견사에 있지만, 실제 근무환경의 안전·보건 의무는 사용사업주에게 있습니다.
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>관련 계산기 · 가이드</h2>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/guide/4-insurance" style={{ textDecoration: 'none' }}>
            <h3>4대보험 총정리</h3>
            <p>국민연금·건강보험·고용보험·산재보험 요율과 가입 기준을 정리했습니다.</p>
          </Link>
          <Link className="value-card" href="/guide/part-time-rights" style={{ textDecoration: 'none' }}>
            <h3>알바생 노동법 권리</h3>
            <p>최저임금, 주휴수당, 부당해고 대응법을 정리했습니다.</p>
          </Link>
          <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
            <h3>퇴직금 계산기</h3>
            <p>근로계약 유형과 관계없이 퇴직금을 계산합니다.</p>
          </Link>
          <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
            <h3>실수령액 계산기</h3>
            <p>4대보험·소득세 공제 후 실제 받는 금액을 확인합니다.</p>
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
