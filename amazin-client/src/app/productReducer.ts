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
    quantityInCart: 0,
  },
  products: [],
};

export const setCurrentProduct = (product: ProductType) => ({
  type: 'SET_CURRENT_PRODUCT',
  payload: product,
});

export const setProducts = (products: ProductType[]) => ({
  type: 'SET_PRODUCTS',
  payload: products,
});

export const updateProduct = (product: ProductType) => ({
  type: 'UPDATE_PRODUCT',
  payload: product,
});

export const productReducer = (
  state = initialState,
  action: ProductAction | UpdateProductAction,
): ProductState => {
  switch (action.type) {
    case 'SET_CURRENT_PRODUCT':
      return {
        ...state,
        currentProduct: action.payload,
      };
      case 'UPDATE_PRODUCT':
      return {
        ...state,
        currentProduct: action.payload,
      };
    default:
      return state;
  }
};

export const productsReducer = (
  state = initialState,
  action: ProductsAction,
): ProductState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

type ProductAction = {
  type: 'SET_CURRENT_PRODUCT';
  payload: ProductType;
};

type UpdateProductAction = {
  type: 'UPDATE_PRODUCT';
  payload: ProductType;
};

type ProductsAction = {
  type: 'SET_PRODUCTS';
  payload: ProductType[];
};