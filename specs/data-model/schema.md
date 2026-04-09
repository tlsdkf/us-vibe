# Data Model

- User
  - id (uuid)
  - email (unique)
  - passwordHash
  - createdAt
  - projectState (optional 1:1)

- ProjectState
  - id (uuid)
  - userId (unique, FK → User, cascade delete)
  - stateVersion (int, ≥1, optimistic concurrency)
  - approvedRequirements (string[])
  - rejectedDecisions (string[])
  - openQuestions (string[])
  - currentApiSpecs (string[])
