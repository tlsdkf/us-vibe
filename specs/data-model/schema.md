# Data Model

- User (persistence)
  - id (uuid)
  - email (unique, stored lowercased)
  - passwordHash (bcrypt; server-only, never returned by HTTP)
  - createdAt (timestamptz)

API responses use the TypeScript `User` type in `types.ts` (no `passwordHash`).

- CollaborationEvent (append-only log)
  - id (uuid)
  - eventType (varchar 128; use agreed vocabulary where possible)
  - payload (jsonb)
  - sessionId (optional varchar 256)
  - createdAt (timestamptz)
