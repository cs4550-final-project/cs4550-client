import { User } from "./user";

export type UserRecipeReview = {
  recipe: string;
  owner: {
    _id: string;
    username: string;
  };
  rating: number;
  review: string;
};
