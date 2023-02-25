import { Dispatch } from 'react';

export type UserDispatch = Dispatch<UserAction>;

export interface UserState {
  id: string;
  name: string;
}

export type UserAction =
  | { type: 'LOGIN'; data: UserState }
  | { type: 'LOGOUT'; data: undefined };
