'use client';

import { useState, useCallback } from 'react';

interface ShareButtonsProps {
  title: string;
  description?: string;
  /** Override URL (defaults to current page) */
  url?: string;
}

export default function ShareButtons({ title, description, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = useCallback(() => {
    if (url) return url;
    if (typeof window !== 'undefined') return window.location.href;
    return '';
  }, [url]);

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, text: description, url: getUrl() });
    } catch {
      // user cancelled or not supported
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: no clipboard
    }
  };

  const handleKakao = () => {
    const w = window as typeof window & { Kakao?: { isInitialized: () => boolean; Share: { sendDefault: (p: Record<string, unknown>) => void } } };
    if (!w.Kakao) return;
    if (!w.Kakao.isInitialized()) return;
    w.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description: description || '',
        imageUrl: `${getUrl().replace(/\/[^/]*$/, '')}/og-image.png`,
        link: { mobileWebUrl: getUrl(), webUrl: getUrl() },
      },
      buttons: [
        { title: '계산해보기', link: { mobileWebUrl: getUrl(), webUrl: getUrl() } },
      ],
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share;
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

  return (
    <div className="share-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
      {hasNativeShare && (
        <button type="button" className="ghost-button" onClick={handleNativeShare}
          style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
          공유
        </button>
      )}
      <button type="button" className="ghost-button" onClick={handleCopyUrl}
        style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
        {copied ? '복사됨' : 'URL 복사'}
      </button>
      {kakaoKey && (
        <button type="button" className="ghost-button" onClick={handleKakao}
          style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
          카카오톡
        </button>
      )}
      <button type="button" className="ghost-button" onClick={handlePrint}
        style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
        인쇄 / PDF
      </button>
    </div>
  );
}
