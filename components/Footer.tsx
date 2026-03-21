import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="footer-grid">
          <section>
            <h3>주의</h3>
            <p className="footer-meta">
              본 계산기는 참고용 정보 제공 도구일 뿐, 법적 효력을 갖지 않습니다.
              정확한 실수령액은 근로계약서 및 급여명세서를 직접 확인하거나 노무사와 상담하세요.
            </p>
          </section>
          <section>
            <h3>퇴사각</h3>
            <div className="footer-links">
              <Link href="/">홈</Link>
              <Link href="/about">소개</Link>
              <Link href="/sources">출처</Link>
              <Link href="/update-log">업데이트</Link>
              <Link href="/privacy">개인정보</Link>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
