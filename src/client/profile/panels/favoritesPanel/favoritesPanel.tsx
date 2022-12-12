import React, { useState, useEffect, useContext } from "react";
import TabPanel, { TabPanelProps } from "../../../components/tabPanel/tabPanel";
import { User } from "../../../types/user";
import { Recipe } from "../../../types/recipes";
import ListOfTiles from "../../../components/listOfTiles/listOfTiles";
import { getRecipeById } from "../../../../service/spoonacular/recipesService";
import Loading from "../../../components/loading/loading";

interface FavoritesPanelProps extends TabPanelProps {
  user: User | undefined;
}

const FavoritesPanel = ({ value, user }: FavoritesPanelProps) => {
  const [loading, setLoading] = useState(true);
  const [favoritedRecipes, setFavoritedRecipes] = useState<
    Recipe[] | undefined
  >();

  const finishLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const addRecipes = async () => {
    const populated: Recipe[] = [];
    if (user) {
      const promises = await user.favorites.map(async (id) => {
        await getRecipeById(id).then((res: Recipe) => {
          populated.push(res);
        });
      });
      Promise.all(promises).then(() => {
        setFavoritedRecipes(populated);
      });
    }
  };

  useEffect(() => {
    addRecipes();
    finishLoading();
  }, [user]);

  return loading ? (
    <Loading />
  ) : (
    <TabPanel value={value}>
      <h6>Favorite Recipes:</h6>
      {favoritedRecipes && favoritedRecipes?.length > 0 ? (
        <ListOfTiles recipes={favoritedRecipes} />
      ) : (
        <p>No favorited recipes</p>
      )}
    </TabPanel>
  );
};

export default FavoritesPanel;
