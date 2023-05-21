export type ProductType = {
  id: number;
  name: string;
  image: string;
  price_cents: number;
  reviews: any[];
  description: string;
  quantity: number;
  quantityInCart?: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  category?: CategoryType;
  isActive?: boolean;
};

export type CategoryType = {
  id: number;
  name: string;
  products: any[];
  createdAt: string;
  updatedAt: string;
};

export type DepartmentType = {
  id: number;
  name: string;
  categories: any[];
  createdAt: string;
  updatedAt: string;
};

export type ReviewUserType = {
  id: number;
  name: string;
};

export type ReviewType = {
  id: number;
  rating: number;
  description: string;
  userId: number;
  user: ReviewUserType;
  createdAt: string;
  updatedAt: string;
};

export type UserType = {
  id: number;
  email: string;
  name: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  quantityInCart: number;
  price_cents: number;
  reviews: any[];
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export type CartType = CartItem[];

export type UserOrderType = {
  id: number;
  name: string;
  address: string;
};

export type SellerOrdersType = OrderType[];

export type OrderType = {
  id: number;
  userId: number;
  orderItems: OrderItemType[];
  paymentId: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  user?: UserOrderType;
};

export type OrderItemType = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: ProductType;
};
