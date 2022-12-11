import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { TextField, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../service/users/userService";
import { User } from "../../types/user";
import {
  getRecipeById,
  getRecipeReviews,
} from "../../../service/spoonacular/recipesService";
import { Recipe } from "../../types/recipes";

type ReviewProps = {
  rating: number;
  review: string;
  user: {
    _id: string;
    username: string;
  };
  recipeId: string;
};

const ProfileReview = ({ rating, review, user, recipeId }: ReviewProps) => {
  const navigateTo = useNavigate();
  const [value, setValue] = React.useState<number | null>(2);
  const [recipe, setRecipe] = useState<Recipe | undefined>();

  const handleUsernameClick = () => {
    navigateTo(`/details/${recipe}`);
  };

  const getRecipeDetails = () => {
    const fetchRecipes = async () => {
      const recipe = getRecipeById(recipeId);
      return recipe;
    };
    fetchRecipes().then((res) => {
      setRecipe(res);
    });
  };

  useEffect(() => {
    getRecipeDetails();
  }, []);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { marginBottom: "24px", width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <Rating
        name="simple-controlled"
        value={rating}
        readOnly
        sx={{ margin: "4px 0" }}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
      />
      <h6
        style={{ marginBottom: "4px", marginLeft: "4px", cursor: "pointer" }}
        onClick={handleUsernameClick}
      >
        {recipe?.title}
      </h6>
      <p style={{ marginBottom: "48px", marginLeft: "4px" }}>{review}</p>
    </Box>
  );
};
export default ProfileReview;
