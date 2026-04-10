# API Contract Summary

## Version
- current: v1

## Endpoints
- `GET /health`
- `GET /health/db`
- `GET /health/redis`
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout` (Bearer JWT)
- `GET /users/me` (Bearer JWT)
- `POST /collaboration/events`

## Response Policy
- success: `{ ok: boolean, service: string }` for `/health`
- success: `{ ok: boolean, database: "up" | "down" }` for `/health/db`
- success: `{ ok: boolean, redis: "disabled" | "up" | "down" }` for `/health/redis`
- success: `{ accessToken: string }` for `/auth/register` (201) and `/auth/login` (200)
- success: `{ ok: true }` for `/auth/logout`
- success: `{ id, email, createdAt }` for `/users/me` (ISO 8601 `createdAt`)
- success: `{ id, createdAt }` for `/collaboration/events` (201)
- error: `{ code: string, message: string }`

## Auth error codes (non-exhaustive)
- `EMAIL_TAKEN`, `AUTH_INVALID_CREDENTIALS`, `AUTH_MISSING_TOKEN`, `AUTH_INVALID_TOKEN`, `TOKEN_REVOKED`, `USER_NOT_FOUND`
- `VALIDATION_EMAIL`, `VALIDATION_PASSWORD`, `VALIDATION_EVENT_TYPE`
