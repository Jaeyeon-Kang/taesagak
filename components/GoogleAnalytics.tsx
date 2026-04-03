'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_KEY = 'taesagak_cookie_consent';

export default function GoogleAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    try {
      setAllowed(localStorage.getItem(CONSENT_KEY) === 'true');
    } catch {}

    function onStorage(e: StorageEvent) {
      if (e.key === CONSENT_KEY) setAllowed(e.newValue === 'true');
    }
    window.addEventListener('storage', onStorage);

    // Also listen for same-tab changes via a custom event
    function onConsent() {
      try { setAllowed(localStorage.getItem(CONSENT_KEY) === 'true'); } catch {}
    }
    window.addEventListener('cookie-consent-change', onConsent);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cookie-consent-change', onConsent);
    };
  }, []);

  if (!GA_ID || !allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
