import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabPanel, { TabPanelProps } from "../../../components/tabPanel/tabPanel";
import { UserContext } from "../../../contextProviders/user/UserContext";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import styles from "./profilePanel.module.scss";
import profileImg from "./profile.png";
import { User } from "../../../types/user";

interface ProfilePanelProps extends TabPanelProps {
  user: User;
}

const ProfilePanel = ({ value, user }: ProfilePanelProps) => {
  const currentUser = useContext(UserContext);
  const isCurrentUser = user._id === currentUser?._id;

  return (
    <TabPanel value={value}>
      <Box>
        <Grid container className={styles.profileContainer}>
          <Grid item xs={12} md={3}>
            <img src={profileImg} className={styles.profileImg} />
          </Grid>
          <Grid item xs={12} md={9}>
            <h3>{user.username}</h3>
            <h5> {user.role}</h5>
          </Grid>
          <Grid item xs={12}>
            {user.username}
          </Grid>
        </Grid>
      </Box>
    </TabPanel>
  );
};

export default ProfilePanel;
