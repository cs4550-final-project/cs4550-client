import React, { useState } from "react";
import { Box } from "@mui/system";
import { TextField, Rating } from "@mui/material";

type ReviewProps = {
  rating: number;
  review: string;
  username: string;
};

const Review = ({ rating, review, username }: ReviewProps) => {
  const [value, setValue] = React.useState<number | null>(2);

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
      <h6 style={{ marginBottom: "4px", marginLeft: "4px" }}>{username}</h6>
      <p style={{ marginBottom: "48px", marginLeft: "4px" }}>{review}</p>
    </Box>
  );
};
export default Review;
