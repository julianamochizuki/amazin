import { ProductFilterType } from '../types/types';

export interface ProductFilterState {
  currentProductFilter: ProductFilterType;
  currentProductSearch: string;
}

const initialState: ProductFilterState = {
  currentProductFilter: {
    rating: 0,
    minPrice: 0,
    maxPrice: 10000000,
  },
  currentProductSearch: '',
};

interface SetCurrentProductFilterAction {
  type: 'SET_CURRENT_PRODUCT_FILTER';
  payload: ProductFilterType;
}

interface SetCurrentProductSearchAction {
  type: 'SET_CURRENT_PRODUCT_SEARCH';
  payload: string;
}

interface ResetCurrentProductFilterAction {
  type: 'RESET_CURRENT_PRODUCT_FILTER';
}

export const setCurrentProductFilter = (
  productFilter: ProductFilterType
): SetCurrentProductFilterAction => ({
  type: 'SET_CURRENT_PRODUCT_FILTER',
  payload: productFilter,
});

export const setCurrentProductSearch = (productSearch: string) => ({
  type: 'SET_CURRENT_PRODUCT_SEARCH',
  payload: productSearch,
});

export const resetCurrentProductFilter =
  (): ResetCurrentProductFilterAction => ({
    type: 'RESET_CURRENT_PRODUCT_FILTER',
  });

export const productFilterReducer = (
  state = initialState,
  action: SetCurrentProductFilterAction | ResetCurrentProductFilterAction
): ProductFilterState => {
  switch (action.type) {
    case 'SET_CURRENT_PRODUCT_FILTER':
      return {
        ...state,
        currentProductFilter: action.payload,
      };
    case 'RESET_CURRENT_PRODUCT_FILTER':
      return {
        ...state,
        currentProductFilter: initialState.currentProductFilter,
      };
    default:
      return state;
  }
};

export const productSearchReducer = (
  state = initialState,
  action: SetCurrentProductSearchAction
): ProductFilterState => {
  switch (action.type) {
    case 'SET_CURRENT_PRODUCT_SEARCH':
      return {
        ...state,
        currentProductSearch: action.payload,
      };
    default:
      return state;
  }
};
