import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__text">
            <strong>퇴사각</strong>
            <span>근로자용 돈찾기 계산기</span>
          </span>
        </Link>
        <nav className="nav" aria-label="주요">
          <Link href="/">홈</Link>
          <Link href="/calculator">계산기</Link>
          <Link href="/sources">출처</Link>
        </nav>
      </div>
    </header>
  );
}
