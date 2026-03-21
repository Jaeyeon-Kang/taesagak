import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/">
          <img
            className="brand__mark"
            src="/icons/logo-icon.svg"
            alt="퇴사각 로고"
            width={40}
            height={40}
          />
          <span className="brand__text">
            <strong>퇴사각</strong>
            <span>근로자용 돈찾기 계산기</span>
          </span>
        </Link>
        <nav className="nav" aria-label="주요">
          <Link href="/">홈</Link>
          <Link href="/calculator">계산기</Link>
          <Link href="/guide/resignation">가이드</Link>
          <Link href="/sources">출처</Link>
          <Link href="/about">소개</Link>
        </nav>
      </div>
    </header>
  );
}
