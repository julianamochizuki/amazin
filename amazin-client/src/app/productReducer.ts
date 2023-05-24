import { ProductType } from '../types/types';

export interface ProductState {
  currentProduct: ProductType;
  products: ProductType[];
}

const initialState: ProductState = {
  currentProduct: {
    id: 0,
    name: '',
    image: '',
    price_cents: 0,
    reviews: [],
    description: '',
    quantity: 0,
    userId: 0,
    createdAt: '',
    updatedAt: '',
  },
  products: [],
};

export const setCurrentProduct = (product: ProductType) => ({
  type: 'SET_CURRENT_PRODUCT',
  payload: product,
});

export const productReducer = (
  state = initialState,
  action: ProductAction,
): ProductState => {
  switch (action.type) {
    case 'SET_CURRENT_PRODUCT':
      return {
        ...state,
        currentProduct: action.payload,
      };
    default:
      return state;
  }
};

type ProductAction = {
  type: 'SET_CURRENT_PRODUCT';
  payload: ProductType;
};
