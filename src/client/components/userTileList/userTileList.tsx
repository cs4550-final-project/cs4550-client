import { Grid } from "@mui/material";
import React from "react";
import styles from "./userTileList.module.scss";
import UserTile from "../userTile/userTile";
import { Recipe } from "../../types/recipes";
import { User } from "../../types/user";

const UserTileList = ({
  currentUser,
  users,
  setTabValue,
}: {
  currentUser: User;
  users: User[];
  setTabValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
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
      {users ? (
        Object.values(users)
          .filter((_user) => _user._id !== currentUser?._id)
          .map((user) => (
            <Grid
              direction={"row"}
              key={`grid-${user._id}`}
              className={styles.userItem}
              item
              xs={false}
            >
              <UserTile user={user} setTabValue={setTabValue} />
            </Grid>
          ))
      ) : (
        <></>
      )}
    </Grid>
  );
};

export default UserTileList;
