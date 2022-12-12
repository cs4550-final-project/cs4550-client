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
  const userRole = user.role;

  const handleClickTile = () => {
    navigateTo(`/profile/${user._id}`);
    setTabValue(0);
  };

  return (
    <Box
      sx={{ width: { md: "100%", sm: "100%", xs: "100%" }, padding: "0" }}
      className={styles.userTileContainer}
      onClick={() => handleClickTile()}
    >
      <Box
        className={styles.userTypeIndicator}
        sx={{ backgroundColor: userRole === "critic" ? "#435480" : "#C44A87" }}
      >
        <Typography className={styles.userRoleLabel}>
          {userRole === "critic" ? "Critic" : "User"}
        </Typography>
      </Box>
      <Box className={styles.userNameContainer}>
        <h6 onClick={() => handleClickTile()}>{user.username}</h6>
      </Box>
    </Box>
  );
};

export default UserTile;
