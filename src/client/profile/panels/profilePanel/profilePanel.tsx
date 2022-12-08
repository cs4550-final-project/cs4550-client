import React, { useContext, useState } from "react";
import TabPanel, { TabPanelProps } from "../../../components/tabPanel/tabPanel";
import { UserContext } from "../../../contextProviders/user/UserContext";
import { Box } from "@mui/system";
import styles from "./profilePanel.module.scss";
import { User } from "../../../types/user";
import { FormControl, Grid, TextField } from "@mui/material";
import Button from "../../../components/button/button";
import { colors } from "../../../styles/colors";

interface ProfilePanelProps extends TabPanelProps {
  user: User;
}

const ProfilePanel = ({ value, user }: ProfilePanelProps) => {
  const [editing, setEditing] = useState(false);
  const currentUser = useContext(UserContext);
  const isCurrentUser = user._id === currentUser?._id;

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
  };

  return (
    <TabPanel value={value}>
      <Box>
        <Grid container className={styles.profileContainer}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: colors.lightGray,
              padding: "24px 16px",
            }}
          >
            <div>
              <h3>{user.username}</h3>
              <h5> {user.role}</h5>
              <p></p>
            </div>
            {!isCurrentUser && !editing && (
              <Button
                label={"Edit Profile"}
                variant="outlined"
                style="primary"
                sx={{
                  height: "48px",
                  width: "160px",
                }}
                onClick={handleEditClick}
              />
            )}
            {!isCurrentUser && editing && (
              <Button
                label={"Save"}
                variant="contained"
                style="primary"
                sx={{ height: "48px", width: "160px" }}
                onClick={handleSaveClick}
              />
            )}
          </Grid>
          <Grid item xs={12} sx={{ padding: "24px" }}>
            <div>
              <h6>About</h6>
              <TextField
                multiline
                id="bio"
                InputProps={{
                  readOnly: !editing,
                }}
                defaultValue={
                  user.bio ? user.bio : "This user does not have a bio yet."
                }
                sx={{ marginTop: "16px", width: "100%" }}
              />
            </div>
            <FormControl className={styles.formControl}>
              <label>Username:</label>
              <TextField
                id="username"
                InputProps={{
                  readOnly: !editing,
                }}
                defaultValue={user.username}
                sx={{ marginTop: "16px" }}
              />
              {!isCurrentUser && (
                <>
                  {editing && (
                    <label>
                      To update your password, please enter your old password
                      and your new password.
                    </label>
                  )}
                  <label>Current Password:</label>
                  <TextField
                    id="password"
                    type="password"
                    defaultValue={"placeholder"}
                    value={!editing ? "placeholder" : ""}
                    autoComplete="current-password"
                    sx={{ marginTop: "16px" }}
                    InputProps={{
                      readOnly: !editing,
                    }}
                  />
                  {editing && (
                    <>
                      <label>New Password:</label>
                      <TextField
                        id="password"
                        type="password"
                        sx={{ marginTop: "16px" }}
                        InputProps={{
                          readOnly: !editing,
                        }}
                      />
                    </>
                  )}
                </>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </TabPanel>
  );
};

export default ProfilePanel;
