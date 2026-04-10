/** Client-visible user; never includes password material. */
export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthCredentialsRequest {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  accessToken: string;
}

export interface CollaborationEventRequest {
  eventType: string;
  payload?: Record<string, unknown>;
  sessionId?: string | null;
}

export interface CollaborationEventResponse {
  id: string;
  createdAt: string;
}
