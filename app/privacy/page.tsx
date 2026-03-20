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
        <h1 className="page-title">개인정보 처리방침</h1>
        <p className="page-lead">
          퇴사각은 사용자의 계산 입력값을 서버로 전송하지 않습니다. 모든 데이터는 브라우저 내에서만 처리됩니다.
        </p>
      </div>

      <div className="legal-stack">
        <section className="legal-block">
          <h2>1. 수집하는 정보</h2>
          <p>
            퇴사각은 회원가입 절차가 없으며, 계산에 입력한 값은 사용자 브라우저의
            <strong> localStorage</strong>에만 저장됩니다. 서버로 전송되거나 외부 데이터베이스에 기록되지 않습니다.
          </p>
        </section>

        <section className="legal-block">
          <h2>2. 저장 목적</h2>
          <p>
            최근 입력값 유지, 계산 기록 보관, 재접속 시 폼 자동 복원을 위해 사용됩니다.
          </p>
        </section>

        <section className="legal-block">
          <h2>3. 외부 스크립트</h2>
          <p>
            서비스 개선과 운영을 위해 Google Analytics(방문 통계)와 Google AdSense(광고)를 사용하고 있습니다.
            해당 스크립트는 쿠키를 통해 익명화된 이용 정보를 수집할 수 있으며, 이는 각 서비스의 개인정보 처리방침을 따릅니다.
          </p>
        </section>

        <section className="legal-block">
          <h2>4. 데이터 삭제</h2>
          <ul>
            <li>브라우저 저장소(localStorage)를 삭제하면 모든 입력값과 계산 기록이 즉시 제거됩니다.</li>
            <li>브라우저 설정에서 쿠키를 삭제하면 외부 스크립트의 추적 정보도 초기화됩니다.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
