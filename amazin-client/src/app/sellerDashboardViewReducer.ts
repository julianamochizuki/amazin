export interface SellerDashboardViewState {
  currentView: string;
}

const initialState: SellerDashboardViewState = {
  currentView: 'Inventory',
};

export const setCurrentView = (view: string) => ({
  type: 'SET_CURRENT_VIEW',
  payload: view,
});

export const sellerDashboardViewReducer = (
  state = initialState,
  action: SellerDashboardViewAction,
): SellerDashboardViewState => {
  switch (action.type) {
    case 'SET_CURRENT_VIEW':
      return {
        ...state,
        currentView: action.payload,
      };
    default:
      return state;
  }
}

type SellerDashboardViewAction = {
  type: 'SET_CURRENT_VIEW';
  payload: string;
};