import { Grid } from "@mui/material";
import React from "react";
import styles from "./userTileList.module.scss";
import UserTile from "../userTile/userTile";
import { Recipe } from "../../types/recipes";
import { User } from "../../types/user";

const UserTileList = ({
  currentUser,
  users,
}: {
  currentUser: User;
  users: User[];
}) => {
  return (
    <Grid columns={12} container spacing={2} className={styles.tilesContainer}>
      {users ? (
        Object.values(users)
          .filter((_user) => _user._id !== currentUser?._id)
          .map((user) => (
            <Grid
              key={`grid-${user._id}`}
              className={styles.recipeItem}
              item
              xs={false}
            >
              <UserTile user={user} />
            </Grid>
          ))
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default UserTileList;
