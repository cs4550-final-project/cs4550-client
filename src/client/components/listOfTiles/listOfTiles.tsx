import { Grid } from "@mui/material";
import React from "react";
import styles from "./listOfTiles.module.scss";
import RecipeTile from "../recipeTile/recipeTile";
import { Recipe } from "../../types/recipes";

const ListOfTiles = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <Grid columns={12} container spacing={2} className={styles.tilesContainer}>
      {recipes ? (
        Object.values(recipes).map((recipe) => (
          <Grid
            key={`grid-${recipe.id}`}
            className={styles.recipeItem}
            item
            xs={false}
          >
            <RecipeTile
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              id={recipe.id}
              readyInMins={recipe.readyInMinutes}
            />
          </Grid>
        ))
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default ListOfTiles;
