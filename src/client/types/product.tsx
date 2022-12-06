import { Store } from "./store";
export type Product = {
  dimensions: {
    height: number;
    width: number;
    weight: number;
  };
  _id: string;
  store: Store;
  productName: string;
  brand: string;
  description: string;
  productType: string;
  materials: string[];
  price: number;
  quantity: number;
  status: string;
  usersFavorited: string[];
  createdAt: string;
  updatedAt: string;
};
