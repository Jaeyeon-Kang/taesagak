import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '개인정보 처리방침',
  description:
    '퇴사각은 계산 입력값을 브라우저 로컬 저장소에만 저장하며 서버로 전송하지 않습니다. 개인정보 처리 원칙과 저장 범위를 확인하세요.',
  path: '/privacy',
  keywords: ['개인정보 처리방침', '로컬 저장소', '급여 계산기 개인정보'],
});

export default function PrivacyPage() {
  return (
    <main className="page-shell section">
      <div className="section__header">
        <span className="eyebrow">privacy</span>
        <h1 className="page-title">개인정보 처리 메모</h1>
        <p className="page-lead">
          이 MVP는 서버 전송 없이 브라우저 로컬 저장만 사용한다. 한마디로,
          네 입력값을 서버에 굳이 보내지 않는다. 인터넷이 늘 사람 말을 듣는 건 아니지만, 이 부분은 비교적 얌전하다.
        </p>
      </div>

      <div className="legal-stack">
        <section className="legal-block">
          <h2>1. 수집하는 정보</h2>
          <p>
            기본 버전에서는 회원가입이 없고, 계산 입력값은 사용자가 쓰는 브라우저의
            <strong>localStorage</strong>에만 저장된다.
          </p>
        </section>

        <section className="legal-block">
          <h2>2. 저장 목적</h2>
          <p>
            최근 입력값 유지, 계산 기록 5건 저장, 재접속 시 폼 자동 복원.
            딱 여기까지다.
          </p>
        </section>

        <section className="legal-block">
          <h2>3. 서버 전송 여부</h2>
          <p>
            기본 배포본에는 별도 API 호출이 없다.
            다만 추후 광고 스크립트, 분석 스크립트, 문의 폼, 계정 기능을 붙이면 얘기가 달라진다.
            그 시점엔 이 문서도 같이 수정해야 한다. 안 그러면 정책 페이지가 장식품이 된다.
          </p>
        </section>

        <section className="legal-block">
          <h2>4. 사용자가 할 수 있는 일</h2>
          <ul>
            <li>브라우저 저장소 삭제로 입력값/히스토리 제거</li>
            <li>개인정보 입력 자체를 최소화</li>
            <li>민감한 급여명세 상세는 복사만 하고 앱엔 최소 정보만 입력</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
