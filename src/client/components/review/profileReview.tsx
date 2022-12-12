import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  deleteRecipeReview,
  getRecipeById,
} from "../../../service/spoonacular/recipesService";
import { Recipe } from "../../types/recipes";
import { UserContext } from "../../contextProviders/user/UserContext";
import { Delete } from "@mui/icons-material";

type ReviewProps = {
  id: string;
  rating: number;
  review: string;
  recipeId: string;
};

const ProfileReview = ({ rating, review, recipeId, id }: ReviewProps) => {
  const navigateTo = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const currentUser = useContext(UserContext);

  const handleDeleteReview = () => {
    deleteRecipeReview(id, currentUser);
  };

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
    <>
      <Box
        component="form"
        sx={{
          marginBottom: "24px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        noValidate
        autoComplete="off"
      >
        <Box>
          <Rating
            name="simple-controlled"
            value={rating}
            readOnly
            sx={{ margin: "4px 0" }}
          />
          <h6
            style={{
              marginBottom: "4px",
              marginLeft: "4px",
              cursor: "pointer",
            }}
            onClick={handleUsernameClick}
          >
            {recipe?.title}
          </h6>
          <p style={{ marginBottom: "4px", marginLeft: "4px" }}>{review}</p>
        </Box>
        <Delete sx={{ cursor: "pointer" }} onClick={handleDeleteReview} />
      </Box>
      <hr></hr>
    </>
  );
};
export default ProfileReview;
