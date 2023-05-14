export type ProductType = {
  id: number;
  name: string;
  image: string;
  price_cents: number;
  reviews: any[];
  description: string;
  quantity: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
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
}

export type ReviewType = {
  id: number;
  rating: number;
  description: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type UserType = {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};
