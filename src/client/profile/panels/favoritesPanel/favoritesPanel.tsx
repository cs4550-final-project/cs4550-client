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

  const findRecipe = (id: number) => {
    const fetchRecipe = async (id: number) => {
      const recipe = getRecipeById(id);
      return recipe;
    };

    fetchRecipe(id).then((res) => {
      setFavoritedRecipes(res);
    });
  };

  const addRecipes = async (ids: number[]) => {
    await Promise.all(
      ids.map(async (id) => {
        await findRecipe(id);
      })
    );
  };

  useEffect(() => {
    console.log(user);
    console.log(user?.favorites);
    if (user) {
      addRecipes(user?.favorites);
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
