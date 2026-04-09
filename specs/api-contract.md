# API Contract Summary

## Version
- current: v1

## Endpoints
- `GET /health` — `{ ok: boolean, service: string }`
- `POST /auth/register` — body `{ email, password }` (password min 8 chars); `201` → `{ user: UserPublic, accessToken: string }`
- `POST /auth/login` — body `{ email, password }`; `200` → `{ user: UserPublic, accessToken: string }`

## Types
- **UserPublic**: `{ id: string (uuid), email: string, createdAt: string (ISO-8601) }`

## Response Policy
- success: endpoint-specific JSON as in OpenAPI `specs/openapi/v1.yaml`
- error: `{ code: string, message: string }` (HTTP status per operation; e.g. 400 validation, 401 login, 409 duplicate email)
