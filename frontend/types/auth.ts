export type UserRole = 'ADMIN' | 'LEAD_INVESTIGATOR' | 'ANALYST' | 'AUDITOR';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  badge_number?: string;
  agency: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
