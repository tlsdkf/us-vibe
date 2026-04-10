# API Contract Summary

## Version
- current: v1

## Endpoints
- `GET /health`
- `GET /health/db`

## Response Policy
- success: `{ ok: boolean, service: string }` for `/health`
- success: `{ ok: boolean, database: "up" | "down" }` for `/health/db`
- error: `{ code: string, message: string }`
