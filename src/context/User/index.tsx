import React, { createContext, useContext, useReducer } from 'react';
import { UserAction, UserDispatch, UserState } from '../User/type';

const UserStateContext = createContext<UserState | undefined>(undefined);
const UserDispatchContext = createContext<UserDispatch | undefined>(undefined);

function reducer(
  state: UserState | undefined,
  action: UserAction
): UserState | undefined {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return action.data;
    default:
      throw new Error('Unhandled action');
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const state = useContext(UserStateContext);
  return state;
}

export function useUserDispatch() {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error('Cannot find Provider');
  return dispatch;
}
