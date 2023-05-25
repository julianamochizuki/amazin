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

interface SetDepartmentsAction {
  type: 'SET_DEPARTMENTS';
  payload: DepartmentType[];
}

export const setCurrentDepartment = (
  department: DepartmentType | null
): SetCurrentDepartmentAction => ({
  type: 'SET_CURRENT_DEPARTMENT',
  payload: department,
});

export const setDepartments = (
  departments: DepartmentType[]
): SetDepartmentsAction => ({
  type: 'SET_DEPARTMENTS',
  payload: departments,
});

export const departmentReducer = (
  state = initialState,
  action: SetCurrentDepartmentAction | SetDepartmentsAction
): DepartmentState => {
  switch (action.type) {
    case 'SET_CURRENT_DEPARTMENT':
      return {
        ...state,
        currentDepartment: action.payload,
      };
    case 'SET_DEPARTMENTS':
      return {
        ...state,
        departments: action.payload,
      };
    default:
      return state;
  }
};

