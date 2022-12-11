import React, { useState, useEffect } from "react";
import TabPanel, { TabPanelProps } from "../../../components/tabPanel/tabPanel";
import { useNavigate } from "react-router-dom";
import { User } from "../../../types/user";
import { Box } from "@mui/system";
import ListOfTiles from "../../../components/listOfTiles/listOfTiles";
import { getRecipeById } from "../../../../service/spoonacular/recipesService";
import Loading from "../../../components/loading/loading";
import { getFollowing } from "../../../../service/users/userService";
import UserTileList from "../../../components/userTileList/userTileList";

interface FollowingPanelProps extends TabPanelProps {
  user: User | undefined;
}

const FollowingPanel = ({ value, user }: FollowingPanelProps) => {
  const [loading, setLoading] = useState(true);
  const [usersFollowed, setUsersFollowed] = useState<User[] | undefined>();
  const navigateTo = useNavigate();

  const finishLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    console.log("useEffect");
    console.log("user", user);
    if (user) {
      console.log("users followed: ", user.following);
      setUsersFollowed(user.following);
      finishLoading();
    }
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <TabPanel value={value}>
      <h6>Following:</h6>
      {usersFollowed && usersFollowed?.length > 0 ? (
        // <ListOfTiles recipes={usersFollowed} />
        <div>
          {user && usersFollowed && (
            <UserTileList currentUser={user} users={usersFollowed} />
          )}
        </div>
      ) : (
        <p>No users followed</p>
      )}
    </TabPanel>
  );
};

export default FollowingPanel;
