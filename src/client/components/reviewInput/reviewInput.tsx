import React, { useState } from "react";
import { Box } from "@mui/system";
import { TextField, Rating, Snackbar } from "@mui/material";
import Button from "../button/button";
import { addRecipeReview } from "../../../service/spoonacular/recipesService";
import { User } from "../../types/user";
import { UserRecipeReview } from "../../types/userRecipeReview";

const ReviewInput = ({
  user,
  recipeId,
  reviews,
  refreshReviews,
}: {
  user: User;
  recipeId: string;
  reviews: UserRecipeReview[];
  refreshReviews: Function;
}) => {
  const [value, setValue] = React.useState<number | null>(2);
  const [reviewText, setReviewText] = useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleReviewTextChange = (e: any) => {
    setReviewText(e.target.value);
  };

  const handleSetReview = (reviews: UserRecipeReview[]) => {
    refreshReviews();
  };

  const handleSubmit = () => {
    const checkForDoops = reviews.filter((review) => {
      return review.owner === user._id;
    });

    if (checkForDoops.length) {
      setOpenSnackbar(true);
      return;
    }

    const payload = {
      recipe: recipeId,
      owner: user._id,
      rating: value,
      review: reviewText,
    };
    addRecipeReview(payload, user).then((res) => {
      const newRecipeReviews: UserRecipeReview[] = reviews;
      newRecipeReviews.push(res.review);
      handleSetReview(newRecipeReviews);
    });
    setReviewText("");
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
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { marginBottom: "24px", width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="You've already reviewed this recipe"
      />
      {user.role === "critic" ? (
        <>
          <Rating
            name="simple-controlled"
            size="large"
            value={value}
            sx={{ marginBottom: "16px" }}
            onChange={(e, newValue) => {
              setValue(newValue);
            }}
          />
          <TextField
            id="filled-multiline-static"
            label="Leave A Review"
            multiline
            rows={4}
            variant="filled"
            onChange={handleReviewTextChange}
            value={reviewText}
          />
        </>
      ) : (
        <></>
      )}

      <Button
        label="Submit Review"
        variant="outlined"
        sx={{ width: "40%", float: "right", minWidth: "200px" }}
        onClick={handleSubmit}
      />
    </Box>
  );
};

export default ReviewInput;
