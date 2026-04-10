# API Contract Summary

## Version
- current: v1

## Endpoints
- `GET /health`
- `GET /health/db`
- `POST /auth/register`
- `POST /auth/login`
- `GET /users/me` (Bearer JWT)

## Response Policy
- success: `{ ok: boolean, service: string }` for `/health`
- success: `{ ok: boolean, database: "up" | "down" }` for `/health/db`
- success: `{ accessToken: string }` for `/auth/register` (201) and `/auth/login` (200)
- success: `{ id, email, createdAt }` for `/users/me` (ISO 8601 `createdAt`)
- error: `{ code: string, message: string }`

## Auth error codes (non-exhaustive)
- `EMAIL_TAKEN`, `AUTH_INVALID_CREDENTIALS`, `AUTH_MISSING_TOKEN`, `AUTH_INVALID_TOKEN`, `USER_NOT_FOUND`
- `VALIDATION_EMAIL`, `VALIDATION_PASSWORD`
