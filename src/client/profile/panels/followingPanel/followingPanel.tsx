import React, { useState, useEffect } from "react";
import TabPanel, { TabPanelProps } from "../../../components/tabPanel/tabPanel";
import { User } from "../../../types/user";
import Loading from "../../../components/loading/loading";
import UserTileList from "../../../components/userTileList/userTileList";

interface FollowingPanelProps extends TabPanelProps {
  user: User | undefined;
  setTabValue: React.Dispatch<React.SetStateAction<number>>;
}

const FollowingPanel = ({ value, user, setTabValue }: FollowingPanelProps) => {
  const [loading, setLoading] = useState(true);
  const [usersFollowed, setUsersFollowed] = useState<User[] | undefined>();

  const finishLoading = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setUsersFollowed(user?.following);
    finishLoading();
  }, [user]);

  return loading ? (
    <Loading />
  ) : (
    <TabPanel value={value}>
      <h6>Following:</h6>
      {usersFollowed && usersFollowed?.length > 0 ? (
        // <ListOfTiles recipes={usersFollowed} />
        <div>
          {user && usersFollowed && (
            <UserTileList
              currentUser={user}
              users={usersFollowed}
              setTabValue={setTabValue}
            />
          )}
        </div>
      ) : (
        <p>No users followed</p>
      )}
    </TabPanel>
  );
};

export default FollowingPanel;
