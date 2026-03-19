import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '퇴사각',
    short_name: '퇴사각',
    description:
      '퇴직금 계산기, 실수령액 계산기, 주휴수당 계산기, 최저임금 계산기를 한 번에 확인하는 근로자용 돈찾기 도구.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
