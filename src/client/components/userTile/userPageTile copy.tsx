import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/user";
import styles from "./userTile.module.scss";

const UserPageTile = ({ user }: { user: User }) => {
  const navigateTo = useNavigate();

  const handleClickTile = () => {
    navigateTo(`/profile/${user._id}`);
  };

  return (
    <Box
      sx={{ width: { md: "100%", sm: "100%", xs: "100%" }, padding: "16px;" }}
      className={styles.userTileContainer}
      onClick={() => handleClickTile()}
    >
      <h6 onClick={() => handleClickTile()}>{user.username}</h6>
    </Box>
  );
};

export default UserPageTile;
