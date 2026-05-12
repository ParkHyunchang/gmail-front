# gmail-front

`gmail-back` 의 `/api/mail/send`, `/api/mail/logs` 엔드포인트를 호출하는
Vue 3 SPA. nginx 컨테이너로 NAS 에 배포한다.

## 스택
- Vue 3 + vue-router
- axios (호스트별 baseURL 자동 감지 — `axios.js` 참고)

## 로컬 실행
```bash
npm ci
npm run serve   # http://localhost:3121
```

`gmail-back` 이 `localhost:3221` 에서 떠 있어야 한다.

## 화면
- `/` — 메일 발송 폼 (to, subject, body, HTML 여부)
- `/logs` — 발송 이력 조회 (DB 의 `mail_log` 테이블)

## 배포
GitHub Actions `deploy.yml` 이 main 푸시 시 빌드 → GHCR → NAS 컨테이너 재기동.
공개 포트는 `3121`.
