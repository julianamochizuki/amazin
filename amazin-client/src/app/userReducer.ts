import { UserType } from '../types/types';

export interface UserState {
  currentUser: UserType;
}

const initialState: UserState = {
  currentUser: {
    id: 0,
    email: '',
    name: '',
    address: '',
    isSeller: false,
  },
};

interface ResetCurrentUser {
  type: 'RESET_CURRENT_USER';
}

export const setCurrentUser = (user: UserType) => ({
  type: 'SET_CURRENT_USER',
  payload: user,
});

export const updateCurrentUser = (user: UserType) => ({
  type: 'UPDATE_CURRENT_USER',
  payload: user,
});

export const resetCurrentUser = (): ResetCurrentUser => ({
  type: 'RESET_CURRENT_USER',
});

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'UPDATE_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      };
    case 'RESET_CURRENT_USER':
      return {
        ...state,
        currentUser: initialState.currentUser,
      };
    default:
      return state;
  }
};

type UserAction = {
  type: 'SET_CURRENT_USER' | 'UPDATE_CURRENT_USER' | 'RESET_CURRENT_USER';
  payload: UserType;
};
