import { BaseState } from 'types/base.state';

export interface AuthState extends BaseState {
  isAuthenticated: boolean;
}
