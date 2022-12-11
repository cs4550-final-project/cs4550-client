import React, { useState } from "react";
import { Box } from "@mui/system";
import { TextField, Rating } from "@mui/material";
import Button from "../button/button";
import { addRecipeReview } from "../../../service/spoonacular/recipesService";
import { User } from "../../types/user";

const ReviewInput = ({ user, recipeId }: { user: User; recipeId: string }) => {
  const [value, setValue] = React.useState<number | null>(2);
  const [reviewText, setReviewText] = useState("");

  const handleReviewTextChange = (e: any) => {
    setReviewText(e.target.value);
  };

  const handleSubmit = () => {
    const payload = {
      recipe: recipeId,
      owner: user._id,
      rating: value,
      review: reviewText,
    };
    console.log(payload);
    addRecipeReview(payload, user);
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
      {user.role === "critic" ? (
        <>
          <Rating
            name="simple-controlled"
            size="large"
            value={value}
            sx={{ marginBottom: "16px" }}
            onChange={(e, newValue) => {
              console.log(newValue);
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
