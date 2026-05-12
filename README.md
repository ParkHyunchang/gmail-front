# gmail-front

[gmail-back](../gmail-back) 의 메일 발송 API 를 호출하는 Vue 3 SPA.
nginx 정적 호스팅으로 NAS 에 배포한다.

## 스택
- Vue 3 + vue-router 4
- axios — 호스트별 baseURL 자동 감지 ([src/axios.js](src/axios.js))
- nginx (배포)

## 화면
| Path | 설명 |
|---|---|
| `/` | 메일 발송 폼 — 받는 사람 / 제목 / 본문 / HTML 여부 |
| `/logs` | 발송 이력 — `mail_log` 테이블의 최근 발송 기록 |

## API 베이스 URL 동작
[src/axios.js](src/axios.js) 가 `window.location.hostname` 을 보고 자동 결정:
- `localhost` / `127.0.0.1` → `http://localhost:3221`
- `125.141.20.218` → `http://125.141.20.218:3221`
- `*.synology.me` → `http://<같은호스트>:3221`
- 그 외 → `http://125.141.20.218:3221`

> 즉, 어디서 띄워도 따로 환경변수 없이 백엔드를 자동으로 찾아간다.

## 로컬 실행
```powershell
npm ci
npm run serve   # http://localhost:3121
```
[gmail-back](../gmail-back) 이 `localhost:3221` 에 떠 있어야 발송 테스트가 동작한다.

## NAS 배포 (GitHub Actions)

main 브랜치 푸시 → 자동 실행되는 흐름:
1. Node 18 셋업 → `npm ci` → `npm run build` (산출물: `dist/`)
2. Docker 이미지 빌드 (nginx + `dist/`) → `ghcr.io/parkhyunchang/gmail-front:latest` 푸시
3. NAS SSH → 기존 컨테이너 stop/rm → 새 이미지로 `docker run -d -p 3121:80`

### 사전 준비 — GitHub Secrets
gmail-back 과 동일:
| Name | 값 |
|---|---|
| `NAS_HOST` | `125.141.20.218` (또는 DDNS) |
| `NAS_USER` | `hyunchang88` |
| `NAS_SSH_PASSWORD` | NAS SSH 비밀번호 |
| `GHCR_PAT` | `read:packages` 권한 GitHub PAT |

### 사전 준비 — 방화벽
DSM → 제어판 → 외부 액세스 / 방화벽: **3121** 포트 개방

### 배포 후 확인
브라우저로 `http://125.141.20.218:3121` 접속 → 발송 폼이 보이면 성공.

## 디렉토리 구조
```
gmail-front/
├── public/index.html
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── axios.js                 # 호스트별 baseURL 자동 감지
│   ├── router/index.js          # / (발송), /logs (이력)
│   ├── services/mailService.js  # POST /api/mail/send, GET /api/mail/logs
│   └── views/
│       ├── SendMailView.vue
│       └── MailLogsView.vue
├── vue.config.js                # devServer port: 3121
├── Dockerfile                   # nginx:alpine + dist/
├── nginx.conf                   # SPA history fallback
└── .github/workflows/deploy.yml
```

## 관련 프로젝트
- [gmail-back](../gmail-back) — 메일 발송 API + MySQL (Spring Boot)
