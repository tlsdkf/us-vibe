/** API에 노출되는 사용자(비밀번호 제외). DB에는 passwordHash가 별도 컬럼으로 존재. */
export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

/** SSOT project state (API shape; matches `.ai/project-state.md` fields). */
export interface ProjectState {
  stateVersion: number;
  approvedRequirements: string[];
  rejectedDecisions: string[];
  openQuestions: string[];
  currentApiSpecs: string[];
}

export type PutProjectStateRequest = ProjectState;
