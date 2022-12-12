import { User } from "./user";

export type UserRecipeReview = {
  _id: string;
  recipe: string;
  owner: {
    _id: string;
    username: string;
  };
  rating: number;
  review: string;
};
