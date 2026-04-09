# US Vibe Monorepo

AI 멀티 에이전트 기반 협업 학습 시뮬레이터 MVP를 위한 모노레포입니다.

## Stack
- Frontend: Next.js (`apps/web`)
- Backend: NestJS (`src/backend`)
- Workspace: npm workspaces (single repository)

## Quick Start
```bash
npm install
cp src/backend/.env.example src/backend/.env   # set DATABASE_URL for PostgreSQL
npm run dev:web
npm run dev:api
```

백엔드는 부팅 시 Prisma가 PostgreSQL에 연결합니다. DB 없이 빌드만 할 때는 `npm run build`만 실행하면 됩니다.

인증 API(`POST /auth/register`, `POST /auth/login`)를 쓰려면 `.env`에 `JWT_SECRET`도 설정하세요(예: `src/backend/.env.example` 참고).

## Ports
- Web: `http://localhost:3000`
- API: `http://localhost:4000/health`

## Documents
- **새 AI 에이전트 / 작업 이어가기:** `docs/ai-agent-handoff.md`
- Product/Sprint plan: `docs/plan.md`
- Full architecture plan: `docs/ai_협업_에이전트_설계_10198352.plan.md`