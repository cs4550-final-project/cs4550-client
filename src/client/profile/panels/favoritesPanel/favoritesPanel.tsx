import React, { useState, useEffect } from "react";
import TabPanel, { TabPanelProps } from "../../../components/tabPanel/tabPanel";
import { User } from "../../../types/user";
import { Box } from "@mui/system";
import { Recipe } from "../../../types/recipes";
import ListOfTiles from "../../../components/listOfTiles/listOfTiles";
import { getRecipeById } from "../../../../service/spoonacular/recipesService";

interface FavoritesPanelProps extends TabPanelProps {
  user: User | undefined;
}

const FavoritesPanel = ({ value, user }: FavoritesPanelProps) => {
  const [favoritedRecipes, setFavoritedRecipes] = useState<
    Recipe[] | undefined
  >();

  const addRecipes = async (ids: number[]) => {
    const populated: Recipe[] = [];
    const promises = await ids.map(async (id) => {
      await getRecipeById(id).then((res: Recipe) => {
        populated.push(res);
      });
    });
    Promise.all(promises).then(() => {
      setFavoritedRecipes(populated);
    });
  };

  useEffect(() => {
    if (user) {
      addRecipes(user.favorites);
    }
  }, []);

  return (
    <TabPanel value={value}>
      <h6>Favorite Recipes:</h6>
      {favoritedRecipes && favoritedRecipes?.length > 0 ? (
        <ListOfTiles recipes={favoritedRecipes} />
      ) : (
        <></>
      )}
    </TabPanel>
  );
};

export default FavoritesPanel;
