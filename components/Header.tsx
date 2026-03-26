'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: '홈' },
  { href: '/calculator', label: '계산기' },
  { href: '/guide/resignation', label: '가이드' },
  { href: '/sources', label: '출처' },
  { href: '/about', label: '소개' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>
        <nav className={`nav${open ? ' nav--open' : ''}`} id="main-nav" aria-label="주요">
          {links.map(({ href, label }) => {
            const isActive = href === '/'
              ? pathname === '/'
              : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={isActive ? 'nav-active' : ''}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
