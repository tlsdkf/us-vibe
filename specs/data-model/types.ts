/** Client-visible user; never includes password material. */
export interface User {
  id: string;
  email: string;
  createdAt: string;
}
