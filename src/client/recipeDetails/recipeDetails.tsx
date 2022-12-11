import {
  Grid,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Snackbar,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./recipeDetails.module.scss";
import Loading from "../components/loading/loading";
import Button from "../components/button/button";
import ReviewInput from "../components/reviewInput/reviewInput";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  getRecipeReviews,
  getRecipeById,
  addRecipeToLiked,
} from "../../service/spoonacular/recipesService";
import { UserRecipeReview } from "../types/userRecipeReview";
import Review from "../components/review/review";
import { UserContext } from "../contextProviders/user/UserContext";
import { Recipe } from "../types/recipes";
import { mockRecipes } from "../../service/spoonacular/mockRecipes";
import Accordion from "@mui/material/Accordion";

const RecipeDetails = ({ setUser }: { setUser: Function }) => {
  let { id } = useParams();
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const [reviews, setReviews] = useState<UserRecipeReview[] | undefined>();
  const [liked, setLiked] = useState<Boolean>(false);
  const finishLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const getRecipeDetails = () => {
    const fetchRecipes = async () => {
      const recipe = getRecipeById(id);
      return recipe;
    };
    fetchRecipes().then((res) => {
      setRecipe(res);
    });
  };

  const getRecipeReviewsById = () => {
    // const reviewsFromUser = getRecipeReviews(user?._id);
    // console.log("reviewsFromUser :", reviewsFromUser);
    const fetchReviews = async () => {
      const recievedReviews = getRecipeReviews(id);
      return recievedReviews;
    };
    fetchReviews().then((res) => {
      console.log("res.reviews", res.reviews);
      setReviews(res.reviews);
    });
  };

  useEffect(() => {
    setRecipe(mockRecipes.results[0]);
    // uncomment later
    // getRecipeDetails();
    getRecipeReviewsById();
    if (user && recipe && user.favorites.includes(recipe?.id)) {
      setLiked(true);
    }
    finishLoading();
    console.log(reviews);
  }, []);

  const placeholders = {
    sm: <div className={`${styles.placeholderSm} ${styles.placeholder}`}></div>,
    md: <div className={`${styles.placeholderMd} ${styles.placeholder}`}></div>,
    text: (
      <div className={`${styles.placeholderText} ${styles.placeholder}`}></div>
    ),
  };

  const handleLikeClicked = () => {
    if (user && recipe) {
      if (liked) {
        const newfavorites = user?.favorites.filter((id) => id != recipe?.id);
        user.favorites = newfavorites;
        setUser(user);
      } else {
        user?.favorites.push(recipe?.id);
        setUser(user);
      }
      setLiked(!liked);
    } else {
      handleOpenSnackbar();
    }
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Grid container spacing={2} className={styles.pdpContainer} mt={3}>
      {loading && <Loading></Loading>}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="You must have an account to save this recipe"
      />
      <Grid item xs={12} md={7} justifyContent="center" alignItems="center">
        <img className={styles.recipeDetailImg} src={recipe?.image} />
        <Accordion key={recipe?.id} className={styles.instructionsContainer}>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
            <Typography>Instructions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {recipe?.analyzedInstructions.map((instruction) => (
              <div key={`div-${recipe.id}`}>
                {instruction.steps.map((step, index) => (
                  <div className={styles.stepContainer} key={`step${index}`}>
                    <p
                      className={styles.stepNumber}
                    >{`Step ${step.number}: `}</p>
                    <p className={styles.stepInstruction}>{`${step.step}`}</p>
                  </div>
                ))}
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12} md={5} justifyContent="center" alignItems="center">
        <div className={styles.pdpHeader}>
          {liked ? (
            <FavoriteIcon
              style={{ cursor: "pointer" }}
              sx={{ fill: "red" }}
              onClick={() => handleLikeClicked()}
            />
          ) : (
            <FavoriteBorderIcon
              style={{ cursor: "pointer" }}
              sx={{ fill: "red" }}
              onClick={handleLikeClicked}
            />
          )}
          {!loading && recipe ? <h3>{recipe.title}</h3> : placeholders.md}
        </div>
        <div className={styles.pdpMain}>
          {!loading && recipe ? (
            <div className={styles.pdpDetails}>
              <h4>Summary</h4>
              <div
                className={styles.pdpSummary}
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
              <Button
                label="View full details"
                onClick={() =>
                  window.open(recipe.sourceUrl, "_blank", "noopener,noreferrer")
                }
              />
            </div>
          ) : (
            placeholders.text
          )}
        </div>
      </Grid>
      <Grid item xs={12} justifyContent="center" alignItems="center">
        {user && id && <ReviewInput user={user} recipeId={id}></ReviewInput>}
        <div className={styles.recipeReviews}>
          <h5>Critic Reviews:</h5>
          {reviews
            ?.slice(0)
            .reverse()
            .map((review, index) => (
              <Review
                key={`review-${index}`}
                user={review.owner}
                rating={review.rating}
                review={review.review}
              />
            ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default RecipeDetails;
