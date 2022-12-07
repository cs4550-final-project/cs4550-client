import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./listingTile.module.scss"

const ListingTile = ({ title, price }: { title: string, price: number }) => {
  return(
    <Box 
      sx={{ width: { md: "100%", sm: "100%", xs: "100%"} }}
      className={styles.listingTileContainer}
    >
      <div className={styles.listingTileImageContainer}>
        <img src={"https://picsum.photos/200"} className={styles.listingTileImage}/>
      </div>
      <div className={styles.listingTileContentContainer}>
        <Typography variant="body1">
          {`$${price}`}
        </Typography>
        <Typography variant="body1">
          {title}
        </Typography>
      </div>
    </Box>
  );
};

export default ListingTile;
