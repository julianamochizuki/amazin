import { CartItem } from '../types/types';

export interface CartState {
  cartItems: CartItem[];
  total: number;
}

const initialState: CartState = {
  cartItems: [],
  total: 0,
};

export const addToCart = (item: CartItem) => ({
  type: 'ADD_TO_CART',
  payload: item,
});

export const updateCart = (item: CartItem) => ({
  type: 'UPDATE_CART',
  payload: item,
});

export const removeFromCart = (itemId: number) => ({
  type: 'REMOVE_FROM_CART',
  payload: itemId,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});

const calculateTotal = (cartItems: CartItem[]) => {
  const total = cartItems.reduce((acc, product: CartItem) => {
    return acc + product.price_cents * (product.quantityInCart ?? 0);
  }, 0);
  return total;
};

export const cartReducer = (
  state = initialState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        total: calculateTotal([...state.cartItems, action.payload]),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
        total: calculateTotal(
          state.cartItems.filter((item) => item.id !== action.payload)
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
        total: 0,
      };
    default:
      return state;
  }
};

type CartAction =
  | {
      type: 'ADD_TO_CART';
      payload: CartItem;
    }
  | {
      type: 'REMOVE_FROM_CART';
      payload: number;
    }
  | {
      type: 'CLEAR_CART';
    };
