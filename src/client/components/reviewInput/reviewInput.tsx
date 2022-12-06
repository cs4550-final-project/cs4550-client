import React, { useState } from "react";
import { Box } from "@mui/system";
import { TextField, Rating } from "@mui/material";
import Button from "../button/button";

const ReviewInput = () => {
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
      />

      <Button
        label="Submit Review"
        variant="outlined"
        sx={{ width: "40%", float: "right", minWidth: "200px" }}
      />
    </Box>
  );
};

export default ReviewInput;
