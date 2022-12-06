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
  usersFavorited?: string[];
  upc?: number;
  attributes?: {
    topHousingMaterial?: string;
    bottomHousingMaterial?: string;
    stemMaterial?: string;
    springWeight?: number;
    prelubed?: boolean;
    switchType?: string;
    packSize?: number;
    mountingPins?: number;
    manufacturer?: string;
  };
  createdAt: string;
  updatedAt: string;
};
