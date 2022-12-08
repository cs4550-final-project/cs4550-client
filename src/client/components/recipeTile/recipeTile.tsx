import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./recipeTile.module.scss";

const RecipeTile = ({
  title,
  id,
  image,
}: {
  title: string;
  id: number;
  image: string;
}) => {
  const navigateTo = useNavigate();

  const handleClickTile = () => {
    navigateTo(`/details/${id}`);
  };

  return (
    <Box
      sx={{ width: { md: "100%", sm: "100%", xs: "100%" } }}
      className={styles.recipeTileContainer}
      onClick={() => handleClickTile()}
    >
      <div className={styles.recipeTileImageContainer}>
        <img src={image} className={styles.recipeTileImage} />
      </div>
      <div className={styles.recipeTileContentContainer}>
        <Typography variant="body1" className={styles.recipeTileTitle}>
          {title}
        </Typography>
      </div>
    </Box>
  );
};

export default RecipeTile;
