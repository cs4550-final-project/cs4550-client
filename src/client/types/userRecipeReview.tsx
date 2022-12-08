import { User } from "./user";

export type UserRecipeReview = {
  product: string;
  owner: {
    _id: string;
    username: string;
  };
  rating: number;
  review: string;
};
