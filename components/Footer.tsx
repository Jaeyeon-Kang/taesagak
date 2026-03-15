import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="footer-grid">
          <section>
            <h3>주의</h3>
            <p className="footer-meta">
              이 계산기는 법률·세무 자문이 아닙니다. 실제 지급액은 근로계약서, 단체협약, 회사 내규,
              급여명세, 비과세 처리, 산입 범위에 따라 달라질 수 있습니다.
            </p>
          </section>
          <section>
            <h3>퇴사각</h3>
            <div className="footer-links">
              <Link href="/">홈</Link>
              <Link href="/sources">출처</Link>
              <Link href="/privacy">개인정보</Link>
              <Link href="/update-log">업데이트</Link>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
