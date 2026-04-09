# API Contract Summary

## Version
- current: v1

## Endpoints
- `GET /health` — `{ ok: boolean, service: string }`
- `POST /auth/register` — body `{ email, password }` (password min 8 chars); `201` → `{ user: UserPublic, accessToken: string }`
- `POST /auth/login` — body `{ email, password }`; `200` → `{ user: UserPublic, accessToken: string }`
- `GET /project-state` — **Bearer JWT** required; `200` → **ProjectState** (없으면 서버가 기본 빈 상태를 만들고 `stateVersion: 1` 반환)
- `PUT /project-state` — **Bearer JWT** required; body **PutProjectStateRequest**; `200` → **ProjectState**; `409` → `STATE_VERSION_CONFLICT` (낙관적 잠금: `stateVersion`이 DB와 다를 때)

## Types
- **UserPublic**: `{ id: string (uuid), email: string, createdAt: string (ISO-8601) }`
- **ProjectState**: `{ stateVersion: number (int ≥1), approvedRequirements: string[], rejectedDecisions: string[], openQuestions: string[], currentApiSpecs: string[] }` (`.ai/project-state.md` SSOT 필드와 동일)
- **PutProjectStateRequest**: **ProjectState**와 동일 키; `stateVersion`은 클라이언트가 알고 있는 **현재** 버전(성공 시 서버가 1 증가)

## Response Policy
- success: endpoint-specific JSON as in OpenAPI `specs/openapi/v1.yaml`
- error: `{ code: string, message: string }` (HTTP status per operation; e.g. 400 validation, 401 login/unauthorized JWT, 409 duplicate email or `STATE_VERSION_CONFLICT` on project state)
