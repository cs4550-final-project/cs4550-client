import React, { useState, useEffect } from "react";
import TabPanel, { TabPanelProps } from "../../../components/tabPanel/tabPanel";
import { User } from "../../../types/user";
import { Box } from "@mui/system";
import ListOfTiles from "../../../components/listOfTiles/listOfTiles";
import { getRecipeById } from "../../../../service/spoonacular/recipesService";
import Loading from "../../../components/loading/loading";
import { getFollowing } from "../../../../service/users/userService";

interface FollowingPanelProps extends TabPanelProps {
  user: User | undefined;
}

const FollowingPanel = ({ value, user }: FollowingPanelProps) => {
  const [loading, setLoading] = useState(true);
  const [usersFollowed, setUsersFollowed] = useState<User[] | undefined>();

  const finishLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const addUsers = async (ids: number[]) => {
    const populated: User[] = [];
    const promises = await ids.map(async (id) => {
      await getFollowing(id).then((res: User) => {
        populated.push(res);
      });
    });
    Promise.all(promises).then(() => {
      setUsersFollowed(populated);
    });
  };

  useEffect(() => {
    if (user) {
      addUsers(user.favorites);
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
          {usersFollowed.map((following) => (
            <h1>{following.username}</h1>
          ))}
        </div>
      ) : (
        <></>
      )}
    </TabPanel>
  );
};

export default FollowingPanel;
