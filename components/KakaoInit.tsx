'use client';

import { useEffect } from 'react';

export default function KakaoInit() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (!key) return;
    const w = window as typeof window & { Kakao?: { isInitialized: () => boolean; init: (k: string) => void } };
    const tryInit = () => {
      if (w.Kakao && !w.Kakao.isInitialized()) {
        w.Kakao.init(key);
      }
    };
    if (w.Kakao) {
      tryInit();
    } else {
      window.addEventListener('load', tryInit);
      return () => window.removeEventListener('load', tryInit);
    }
  }, []);

  return null;
}
