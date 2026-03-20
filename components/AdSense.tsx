'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

export default function AdSenseHead() {
  if (!ADSENSE_ID) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}

export function AdUnit({ slot, format = 'auto' }: { slot: string; format?: string }) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_ID || !slot || pushed.current) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet
    }
  }, [slot]);

  if (!ADSENSE_ID || !slot) {
    return (
      <div className="ad-slot page-shell" aria-hidden="true">
        광고 영역 (AdSense 연결 후 표시)
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={ADSENSE_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
