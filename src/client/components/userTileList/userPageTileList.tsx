import { Grid } from "@mui/material";
import React, { useContext } from "react";
import styles from "./userTileList.module.scss";
import UserPageTile from "../userTile/userPageTile";
import { User } from "../../types/user";
import { UserContext } from "../../contextProviders/user/UserContext";

const UserPageTileList = ({ users }: { users: User[] }) => {
  const currentUser = useContext(UserContext);
  return (
    <Grid
      columns={12}
      direction={"column"}
      container
      spacing={2}
      className={styles.tilesContainer}
      sx={{
        maxWidth: {
          md: "300px",
          sm: "calc((100%) - 16px)",
          xs: "calc((100%) - 16px)",
        },
      }}
    >
      {users && currentUser
        ? Object.values(users)
            .filter((_user) => _user._id !== currentUser?._id)
            .map((user) => (
              <Grid
                key={`grid-${user._id}`}
                className={styles.userItem}
                item
                xs={false}
              >
                <UserPageTile user={user} />
              </Grid>
            ))
        : Object.values(users).map((user) => (
            <Grid
              key={`grid-${user._id}`}
              className={styles.userItem}
              item
              xs={false}
            >
              <UserPageTile user={user} />
            </Grid>
          ))}
    </Grid>
  );
};

export default UserPageTileList;
