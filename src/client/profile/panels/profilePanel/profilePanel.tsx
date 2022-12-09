import React, { useContext, useState } from "react";
import TabPanel, { TabPanelProps } from "../../../components/tabPanel/tabPanel";
import { UserContext } from "../../../contextProviders/user/UserContext";
import { Box } from "@mui/system";
import styles from "./profilePanel.module.scss";
import { User } from "../../../types/user";
import { FormControl, Grid, TextField } from "@mui/material";
import Button from "../../../components/button/button";
import { colors } from "../../../styles/colors";
import { updateUserInfo } from "../../../../service/users/userService";
import { changePassword } from "../../../../service/auth/authService";

interface ProfilePanelProps extends TabPanelProps {
  user: User | undefined;
  setUser: Function;
}

const ProfilePanel = ({ value, user, setUser }: ProfilePanelProps) => {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const currentUser = useContext(UserContext);
  const isCurrentUser = user?._id === currentUser?._id;

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    updateUserInfo({ bio }, user);
    setUser({ ...user, bio });
    if (oldPassword && newPassword) {
      changePassword({ oldPassword, newPassword }, user);
      setOldPassword("");
      setNewPassword("");
    }
  };

  const handleChange = (e: any) => {
    const target = e.target;
    switch (target.name) {
      case "bio":
        setBio(target.value);
        break;
      case "oldPassword":
        setOldPassword(target.value);
        break;
      case "newPassword":
        setNewPassword(target.value);
        break;
    }
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
              <h3>{user?.username}</h3>
              <h5> {user?.role}</h5>
              <p></p>
            </div>
            {isCurrentUser && !editing && (
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
            {isCurrentUser && editing && (
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
                name="bio"
                value={bio || "This user does not have a bio yet."}
                onChange={handleChange}
                sx={{ marginTop: "16px", width: "100%" }}
              />
            </div>
            <FormControl className={styles.formControl}>
              <label>Username:</label>
              <TextField
                id="username"
                name="username"
                InputProps={{
                  readOnly: true,
                }}
                value={user?.username}
                sx={{ marginTop: "16px" }}
              />
              {isCurrentUser && (
                <>
                  {editing && (
                    <label>
                      To update your password, please enter your old password
                      and your new password.
                    </label>
                  )}
                  <label>Current Password:</label>
                  <TextField
                    id="oldPassword"
                    type="password"
                    name="oldPassword"
                    onChange={handleChange}
                    value={!editing ? "placeholder" : oldPassword}
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
                        id="newPassword"
                        type="password"
                        name="newPassword"
                        onChange={handleChange}
                        sx={{ marginTop: "16px" }}
                        InputProps={{
                          readOnly: !editing,
                        }}
                        value={newPassword}
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
