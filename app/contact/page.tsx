import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '문의하기',
  description: '계산 오류 제보, 기능 제안, 기타 문의를 남겨주세요.',
  path: '/contact',
  keywords: ['퇴사각 문의', '계산 오류 제보', '기능 제안'],
});

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScfGppFK3eO0j_PpeYEMQNmeEpT5KzkC7on3oySKU0Xjtaq7g/viewform?embedded=true';

export default function ContactPage() {
  return (
    <main id="main-content" className="page-shell">
      <section className="section">
        <div className="section__header">
          <h1 className="page-title">문의하기</h1>
          <p className="page-lead">
            계산 오류 제보, 기능 제안, 기타 문의를 남겨주세요.
          </p>
        </div>

        <div className="panel" style={{ padding: 0, overflow: 'hidden', borderRadius: '1rem' }}>
          <iframe
            src={GOOGLE_FORM_URL}
            width="100%"
            height="700"
            title="퇴사각 문의하기"
            style={{ display: 'block', border: 0, margin: 0 }}
          >
            Loading…
          </iframe>
        </div>

        <div className="value-grid" style={{ marginTop: '1.5rem' }}>
          <article className="value-card">
            <h3>오류 제보</h3>
            <p>
              계산 결과가 실제와 다르거나 법령 변경이 반영되지 않은 경우
              알려주세요. 확인 후 빠르게 수정하겠습니다.
            </p>
          </article>
          <article className="value-card">
            <h3>기능 제안</h3>
            <p>
              새로운 계산기나 개선 아이디어가 있으시면 제안해 주세요.
              사용자 피드백을 적극 반영하고 있습니다.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
