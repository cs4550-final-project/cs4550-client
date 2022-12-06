import { User } from "./user";

export type UserProductReview = {
  product: string;
  owner: {
    _id: string;
    username: string;
  };
  rating: number;
  review: string;
};
