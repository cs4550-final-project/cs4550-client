import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/user";
import styles from "./userTile.module.scss";

const UserTile = ({
  user,
  setTabValue,
}: {
  user: User;
  setTabValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const navigateTo = useNavigate();

  const handleClickTile = () => {
    navigateTo(`/profile/${user._id}`);
    setTabValue(0);
  };

  return (
    <Box
      sx={{ width: { md: "100%", sm: "100%", xs: "100%" }, padding: "16px;" }}
      className={styles.recipeTileContainer}
      onClick={() => handleClickTile()}
    >
      <h6 onClick={() => handleClickTile()}>{user.username}</h6>
    </Box>
  );
};

export default UserTile;
