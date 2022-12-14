import axios from "axios";
import apiUrl from "../apiConfig";

//const API_KEY = "28f92c9674274356b51f77cb7c8ce68e";
//const API_KEY = "47ab2d15d91246ab96b956ebc319f492";
//const API_KEY = "fad508a910d94092b3ef2fc9b215f305";
// const API_KEY = "cd5ed0a040b44226a736c56e58468976";
const API_KEY = "1db8323752ab44f996378fb36a1caa64";

export const getRecipesBySearchTerm = async (term) => {
  const recipesMatchingSearchTerm = await axios({
    method: "GET",
    url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`,
    params: {
      query: `${term}`,
      instructionsRequired: "true",
      addRecipeInformation: "true",
      number: "20",
    },
  });
  return recipesMatchingSearchTerm.data;
};

export const getRandomRecipes = async () => {
  const randomRecipes = await axios({
    method: "GET",
    url: `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`,
    params: { number: "20" },
  });
  return randomRecipes.data;
};

export const getRecipeReviews = async (id) => {
  const recipeReviews = await axios({
    method: "GET",
    url: apiUrl + "/recipes/" + id + "/reviews",
  });
  return recipeReviews.data;
};

export const getRecipeReviewsFromCritic = async (id) => {
  const recipeReviews = await axios({
    method: "GET",
    url: apiUrl + "/" + id + "/reviews",
  });
  return recipeReviews.data;
};

export const addRecipeReview = async (payload, user) => {
  const reviewRecipe = await axios({
    method: "POST",
    url: `${apiUrl}/reviews`,
    data: payload,
    headers: {
      Authorization: `Token token=${user.token}`,
    },
  });
  return reviewRecipe.data;
};

export const deleteRecipeReview = async (id, user) => {
  const deleteReview = await axios({
    method: "DELETE",
    url: `${apiUrl}/reviews/${id}`,
    headers: {
      Authorization: `Token token=${user.token}`,
    },
  });
  return deleteReview;
};

export const getRecipeById = async (id) => {
  const recipeMatchingId = await axios({
    method: "GET",
    url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
  });
  return recipeMatchingId.data;
};

export const addRecipeToLiked = async (favorites) => {
  const likeRecipe = await axios({
    method: "PATCH",
    url: `${apiUrl}/favorites`,
    data: {
      favorites: favorites,
    },
  });
  return likeRecipe;
};
