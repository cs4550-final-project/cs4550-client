import React, { useState } from "react";
import { Box } from "@mui/system";
import { TextField, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

type ReviewProps = {
  rating: number;
  review: string;
  user: {
    _id: string;
    username: string;
  };
};

const Review = ({ rating, review, user }: ReviewProps) => {
  const navigateTo = useNavigate();
  const [value, setValue] = React.useState<number | null>(2);

  const handleUsernameClick = () => {
    navigateTo("/profile/" + user._id);
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
      <Rating
        name="simple-controlled"
        value={rating}
        readOnly
        sx={{ margin: "4px 0" }}
        onChange={(e, newValue) => {
          console.log(newValue);
          setValue(newValue);
        }}
      />
      <h6
        style={{ marginBottom: "4px", marginLeft: "4px", cursor: "pointer" }}
        onClick={handleUsernameClick}
      >
        {user.username}
      </h6>
      <p style={{ marginBottom: "48px", marginLeft: "4px" }}>{review}</p>
    </Box>
  );
};
export default Review;
