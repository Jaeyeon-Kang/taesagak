'use client';

import { useState, useEffect } from 'react';

const CONSENT_KEY = 'taesagak_cookie_consent';

export default function CookieConsent() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === 'true') setConsent(true);
      else if (stored === 'false') setConsent(false);
    } catch {
      // Private browsing or storage disabled — show banner
    }
  }, []);

  function accept() {
    try { localStorage.setItem(CONSENT_KEY, 'true'); } catch {}
    setConsent(true);
    window.dispatchEvent(new Event('cookie-consent-change'));
  }

  function decline() {
    try { localStorage.setItem(CONSENT_KEY, 'false'); } catch {}
    setConsent(false);
    window.dispatchEvent(new Event('cookie-consent-change'));
  }

  if (consent !== null) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '1rem',
        background: 'var(--surface-1, #fff)',
        borderTop: '1px solid var(--border, #e2e8f0)',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.08)',
      }}
    >
      <div
        style={{
          maxWidth: '48rem',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <p style={{ flex: 1, fontSize: '0.875rem', color: 'var(--text-2, #64748b)', margin: 0, minWidth: '200px' }}>
          이 사이트는 서비스 개선과 광고를 위해 쿠키를 사용합니다.{' '}
          <a href="/privacy" style={{ color: 'var(--accent, #2563eb)', textDecoration: 'underline' }}>개인정보처리방침</a>
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
          <button
            onClick={decline}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              color: 'var(--text-2, #64748b)',
              background: 'var(--surface-2, #f1f5f9)',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            거부
          </button>
          <button
            onClick={accept}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              color: '#fff',
              background: 'var(--accent, #2563eb)',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            동의
          </button>
        </div>
      </div>
    </div>
  );
}
