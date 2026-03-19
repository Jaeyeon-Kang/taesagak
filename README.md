# 퇴사각

Next.js App Router 기반 근로자용 계산기 서비스입니다.

주요 기능:

- 퇴직금 계산기
- 실수령액 계산기
- 주휴수당 계산기
- 최저임금 계산기
- 퇴사 체크리스트와 급여명세서 가이드

## 실행

```bash
npm ci
npm run dev
```

## 구조

```text
app/
  calculator/
  severance/
  net-salary/
  weekly-holiday/
  minimum-wage/
  guide/
  layout.tsx
  page.tsx
components/
lib/
public/
```

## 배포 메모

- SEO 기본 설정은 `lib/seo.ts`에서 관리합니다.
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`가 메타 파일을 생성합니다.
- 실제 도메인을 쓰려면 `NEXT_PUBLIC_SITE_URL`을 설정하세요.
- 토스 익명 송금 버튼을 쓰려면 `NEXT_PUBLIC_TOSS_DONATION_URL`을 설정하세요.
