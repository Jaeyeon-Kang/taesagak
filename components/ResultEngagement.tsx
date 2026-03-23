import Link from 'next/link';
import { AdUnit } from '@/components/AdSense';

type Topic = 'calculator' | 'severance' | 'weekly-holiday' | 'net-salary' | 'minimum-wage';

interface ContentLink {
  href: string;
  title: string;
  description: string;
}

const supportUrl = process.env.NEXT_PUBLIC_TOSS_DONATION_URL;

const contentByTopic: Record<Topic, ContentLink[]> = {
  calculator: [
    {
      href: '/guide/resignation',
      title: '이 퇴직금 받고 퇴사할 때 반드시 챙겨야 할 체크리스트',
      description: '퇴사일, 미사용 연차, 퇴직금 지급기한까지 한 번에 정리합니다.',
    },
    {
      href: '/guide/severance',
      title: '퇴직금 계산할 때 상여금과 연차수당을 빼먹으면 손해 보는 이유',
      description: '평균임금에 무엇이 들어가는지 실제 계산식으로 설명합니다.',
    },
    {
      href: '/guide/payslip',
      title: '급여명세서에서 실수령액이 줄어드는 항목 바로 찾는 법',
      description: '4대보험과 세금 공제 항목을 빠르게 점검할 수 있습니다.',
    },
  ],
  severance: [
    {
      href: '/guide/resignation',
      title: '퇴사 전에 서류와 지급기한부터 확인해야 퇴직금이 안 새어 나갑니다',
      description: '퇴사 전후에 꼭 챙겨야 할 돈과 서류 흐름을 체크리스트로 정리했습니다.',
    },
    {
      href: '/guide/severance',
      title: '퇴직금에 상여금과 연차수당을 반영하는 가장 쉬운 방법',
      description: '최근 3개월 급여만 넣었을 때 왜 금액이 작게 나오는지 설명합니다.',
    },
    {
      href: '/guide/payslip',
      title: '최근 3개월 급여 총액, 급여명세서에서 어디를 합산해야 하나요?',
      description: '퇴직금 계산에 필요한 숫자를 급여명세서에서 바로 찾게 도와줍니다.',
    },
  ],
  'weekly-holiday': [
    {
      href: '/guide/weekly-holiday',
      title: '주휴수당 못 받는 알바가 마지막으로 확인해야 할 조건 4가지',
      description: '주 15시간, 소정근로일 개근, 월급제 환산까지 한 번에 확인합니다.',
    },
    {
      href: '/guide/payslip',
      title: '급여명세서에서 주휴수당이 숨어 있는지 찾는 방법',
      description: '기본급에 포함됐는지, 별도 항목인지 확인할 때 필요한 포인트만 모았습니다.',
    },
    {
      href: '/guide/resignation',
      title: '퇴사 직전 마지막 주 주휴수당도 챙길 수 있는지 확인하세요',
      description: '퇴사 주간의 출근 처리와 지급 기준을 체크리스트로 정리했습니다.',
    },
  ],
  'net-salary': [
    {
      href: '/guide/payslip',
      title: '실수령액이 예상보다 적다면 급여명세서에서 먼저 볼 항목',
      description: '국민연금, 건강보험, 소득세가 어디서 빠지는지 빠르게 확인할 수 있습니다.',
    },
    {
      href: '/guide/resignation',
      title: '퇴사 전 마지막 월급, 실수령액이 달라지는 이유',
      description: '중도 퇴사, 일할 계산, 연차수당 반영 시점까지 정리했습니다.',
    },
    {
      href: '/minimum-wage',
      title: '실수령액만 보지 말고 최저임금 미달 여부도 같이 점검하세요',
      description: '세후 금액이 아니라 환산 시급 기준으로 다시 확인할 수 있습니다.',
    },
  ],
  'minimum-wage': [
    {
      href: '/guide/payslip',
      title: '최저임금 미달 의심될 때 급여명세서에서 증거 남기는 법',
      description: '지급 총액, 근로시간, 수당 항목을 어떤 순서로 확인할지 정리했습니다.',
    },
    {
      href: '/weekly-holiday',
      title: '주휴수당이 빠지면 최저임금 미달처럼 보일 수 있습니다',
      description: '월급제와 시급제 모두 주휴 포함 여부를 다시 계산해볼 수 있습니다.',
    },
    {
      href: '/guide/resignation',
      title: '임금체불이나 최저임금 미달이 있을 때 퇴사 전 준비할 것',
      description: '신고 전에 모아둘 자료와 일정 체크 포인트를 정리했습니다.',
    },
  ],
};

const cpaByTopic: Record<Topic, { label: string; text: string; envKey: string } | null> = {
  calculator: { label: 'IRP 계좌', text: '퇴직금을 IRP로 옮기면 퇴직소득세를 이연할 수 있습니다.', envKey: 'NEXT_PUBLIC_CPA_IRP_URL' },
  severance: { label: 'IRP 계좌', text: '퇴직금을 IRP 계좌로 받으면 퇴직소득세 이연이 가능합니다.', envKey: 'NEXT_PUBLIC_CPA_IRP_URL' },
  'net-salary': { label: '연말정산 환급', text: '세금 공제를 더 받을 수 있는 절세 계좌를 확인해보세요.', envKey: 'NEXT_PUBLIC_CPA_TAX_URL' },
  'weekly-holiday': null,
  'minimum-wage': null,
};

export default function ResultEngagement({ topic }: { topic: Topic }) {
  const links = contentByTopic[topic];
  const cpa = cpaByTopic[topic];
  const cpaUrl = cpa ? (process.env[cpa.envKey] ?? null) : null;

  return (
    <section className="panel engagement-panel">
      <div className="panel__head">
        <div>
          <h3>계산 끝났다면 여기까지 보고 닫지 마세요</h3>
          <p>결과 숫자만 보고 지나치면 놓치기 쉬운 서류, 수당, 확인 포인트를 이어서 볼 수 있습니다.</p>
        </div>
      </div>

      <div className="value-grid engagement-grid" style={{ marginTop: '1rem' }}>
        {links.map((item) => (
          <Link key={item.href} className="value-card engagement-card" href={item.href}>
            <span className="engagement-card__eyebrow">관련 가이드</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Link>
        ))}
      </div>

      {cpa && cpaUrl && (
        <a
          className="value-card cpa-banner"
          href={cpaUrl}
          target="_blank"
          rel="noreferrer noopener"
          style={{ textDecoration: 'none', display: 'block', marginTop: '1rem' }}
        >
          <span className="engagement-card__eyebrow">{cpa.label}</span>
          <h3 style={{ marginBottom: '0.25rem' }}>{cpa.text}</h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-3)' }}>자세히 보기 →</span>
        </a>
      )}

      <AdUnit slot="" format="horizontal" />

      <div className="support-card">
        <div>
          <span className="engagement-card__eyebrow">후원</span>
          <h3>개발자에게 아메리카노 수혈하기</h3>
          <p>
            계산기가 도움 됐다면 작은 후원이 다음 계산기 개선과 가이드 업데이트를 계속 굴리는 데 도움이 됩니다.
          </p>
        </div>
        {supportUrl ? (
          <a
            className="button button--primary"
            href={supportUrl}
            target="_blank"
            rel="noreferrer"
          >
            토스 익명 송금 열기
          </a>
        ) : null}
      </div>
    </section>
  );
}
