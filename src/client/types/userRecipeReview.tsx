import { User } from "./user";

export type UserRecipeReview = {
  _id: string;
  recipe: string;
  owner: string;
  rating: number;
  review: string;
};
