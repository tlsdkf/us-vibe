# AI 에이전트 핸드오프 (작업 이어가기)

**새 대화/새 에이전트는 작업 전 이 문서와 `docs/team-role-charter.md`를 먼저 읽는다.**

## 프로젝트 한 줄

US Vibe — AI 멀티 에이전트 협업 학습 시뮬레이터 MVP. **모노레포**: Next.js `apps/web`, NestJS `src/backend`, npm workspaces.

## 역할 (차터)

- 본 문서는 주로 **B(백엔드 & 데이터)** 이어하기용이나, 공통 맥락도 포함한다.
- 소유 경로: **`src/backend/**`**, **`specs/openapi/**`**, **`specs/data-model/**`** — 계약 변경은 차터 Handshake( B 제안 → C/D 영향 → A 승인 ) 준수.
- 전체 규칙: [team-role-charter.md](team-role-charter.md)

## 현재 스택 (백엔드)

- NestJS 11, Prisma 6, PostgreSQL
- 인증: `bcrypt` + `@nestjs/jwt`, `POST /auth/register`, `POST /auth/login`
- 전역 `ValidationPipe`, HTTP 에러는 `{ code, message }` 형태로 맞추는 `ContractHttpFilter` (`src/backend/src/filters/contract-http.filter.ts`)
- `ConfigModule` + `JWT_SECRET`, `JWT_EXPIRES_IN` (`.env.example` 참고)

## 디렉터리 지도

| 경로 | 설명 |
|------|------|
| `src/backend/` | Nest 앱 (`package.json` name: `backend`). Prisma는 `src/backend/prisma/` |
| `src/backend/src/auth/` | register/login, DTO, `AuthModule` |
| `src/backend/src/prisma/` | `PrismaModule` / `PrismaService` |
| `specs/openapi/v1.yaml` | **현재 계약** (`api-contract.md`의 current: v1) |
| `specs/api-contract.md` | 엔드포인트 요약 |
| `specs/data-model/` | `schema.md`, `types.ts` (API 노출 타입; 비밀번호는 DB만) |
| `.ai/project-state.md` | 사람이 쓰는 SSOT 초안 (DB 이전은 Feature 3 이후 검토) |
| `apps/web/` | Next 16; ESLint flat (`eslint.config.mjs`), `next lint` 없음 → `eslint .` |

## 이미 끝난 작업 (플랜 대비)

Git 히스토리(최신이 위)와 대응:

1. **chore: monorepo scaffold** — 웹·문서·에이전트·CI·스펙 뼈대 (백엔드 패키지 없던 단계와 동일 계열).
2. **feat(backend): Nest + Prisma baseline** — 플랜 **Feature 0 + 1**에 해당: `src/backend`, Prisma, 초기 마이그레이션, `GET /health`, 루트 workspace 연동.
3. **feat(backend): user + JWT + OpenAPI** — 플랜 **Feature 2**: `User` 모델, register/login, OpenAPI·`api-contract`·`types.ts` 정합.
4. **chore(web): @types/body-parser** — 웹 빌드/TS 안정화 (기능 번호 없음).
5. **feat(backend): ProjectState** — 플랜 **Feature 3**: `ProjectState` 영속화, `GET`/`PUT /project-state`, JWT 소유권, `stateVersion` 낙관적 잠금, OpenAPI·계약·`data-model` 정합.

**백엔드 Feature 번호로 말하면 Feature 3까지 완료.** Feature 0·1은 한 커밋에 묶여 있음.

## 아직 안 한 작업 (다음 에이전트가 할 일)

플랜 파일: `.cursor/plans/b_백엔드_e2e_플로우_1a044fbf.plan.md` (요약만 아래).

| 우선 | 내용 |
|------|------|
| 팀 합의 | SSOT: `.ai` 마크다운 vs DB 단일 진실, OpenAPI v1 vs v1.1 정리, 인증 쿠키 vs Bearer 등 (`align-ssot-auth`) |
| Feature 4 | 에이전트 대화·결정 로그 스키마 + append/query + OpenAPI |
| Feature 5 | Redis — 용도 하나만 먼저 합의 후 연동 |

## 로컬 명령 (루트에서)

```bash
npm install
npm run dev:web    # :3000
npm run dev:api    # :4000, DATABASE_URL·JWT_SECRET 필요
npm run build
npm run lint
```

DB 마이그레이션 (백엔드 폴더):

```bash
cd src/backend
npx prisma migrate deploy   # 또는 migrate dev
```

`.env`는 커밋하지 않음. 복사: `cp src/backend/.env.example src/backend/.env`

## 주의사항 (에이전트가 헷갈리기 쉬운 점)

- **워크스페이스 이름**: `npm run ... -w backend` (`apps/api` 아님).
- **Prisma Client** 생성 위치는 npm hoist에 따라 루트 `node_modules` 쪽일 수 있음 — `prisma generate`는 `npm run build -w backend`에 포함.
- **Git**: 원격 `develop`과 로컬 히스토리가 어긋난 적이 있음. 개인 repo는 `develop`을 작업 브랜치와 맞춘 뒤, 앞으로는 **clone 받은 폴더에서만** 브랜치 작업 권장.
- **브랜치 규칙**: `feature/b-<topic>` → PR base `develop` (차터).

## 사용자가 쓰는 워크플로 (참고)

1. 기능 단위 구현 후 멈춤  
2. `feature/b-...` 브랜치에서 커밋 → push → (카톡 공지)  
3. 계약/문서 갱신  
4. 다음 기능

## 다음 커밋 제안 메시지 예시

- `feat(backend): add ProjectState persistence and API`  
- `feat(backend): add agent session log append and list`  
- `chore(backend): add Redis for <용도>`

---

*마지막 업데이트: 핸드오프 문서 작성 시점 기준. 코드 변경 후 이 문서의 “이미 끝난 작업/아직 안 한 작업”을 갱신할 것.*
