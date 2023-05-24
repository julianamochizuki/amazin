import { DepartmentType } from '../types/types';

export interface DepartmentState {
  currentDepartment: DepartmentType | null;
  departments: DepartmentType[];
}

const initialState: DepartmentState = {
  currentDepartment: null,
  departments: [],
};

interface SetCurrentDepartmentAction {
  type: 'SET_CURRENT_DEPARTMENT';
  payload: DepartmentType | null;
}

export const setCurrentDepartment = (
  department: DepartmentType | null
): SetCurrentDepartmentAction => ({
  type: 'SET_CURRENT_DEPARTMENT',
  payload: department,
});

export const departmentReducer = (
  state = initialState,
  action: SetCurrentDepartmentAction
): DepartmentState => {
  switch (action.type) {
    case 'SET_CURRENT_DEPARTMENT':
      return {
        ...state,
        currentDepartment: action.payload,
      };
    default:
      return state;
  }
};

