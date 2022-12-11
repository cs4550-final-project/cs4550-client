import React, { useContext, useEffect, useState } from "react";
import TabPanel, { TabPanelProps } from "../../../components/tabPanel/tabPanel";
import { UserContext } from "../../../contextProviders/user/UserContext";
import { Box } from "@mui/system";
import styles from "./profilePanel.module.scss";
import { User } from "../../../types/user";
import { FormControl, Grid, TextField, Snackbar } from "@mui/material";
import Button from "../../../components/button/button";
import { colors } from "../../../styles/colors";
import {
  getUserById,
  updateFollowing,
  updateUserInfo,
} from "../../../../service/users/userService";
import { changePassword } from "../../../../service/auth/authService";
import { useParams } from "react-router-dom";

interface ProfilePanelProps extends TabPanelProps {
  user: User | undefined;
  setUser: Function;
}

const ProfilePanel = ({ value, user, setUser }: ProfilePanelProps) => {
  let { id } = useParams();

  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const currentUser = useContext(UserContext);
  const isCurrentUser = user?._id === currentUser?._id;
  const [isFollowing, setIsFollowing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  useEffect(() => {
    if (currentUser && user && !isCurrentUser) {
      currentUser.following?.forEach((followedUser) => {
        if (followedUser._id === id) {
          setIsFollowing(true);
        }
      });
    }
    setBio(user?.bio || "");
  }, [user]);
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleFollow = () => {
    console.log(user);
    if (id && currentUser) {
      getUserById(id).then((res) => {
        const updatedFollowing = user?.following;
        updatedFollowing?.push(res.data.user);
        updateFollowing(updatedFollowing, user);
        setIsFollowing(true);
      });
    } else {
      handleOpenSnackbar();
    }
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleUnfollow = () => {
    if (id) {
      getUserById(id).then((res) => {
        const updatedFollowing = user?.following;
        updateFollowing(
          updatedFollowing?.filter(
            (followedUser) => followedUser._id !== res.data.user._id
          ),
          user
        );
        setIsFollowing(false);
      });
    }
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="You must have an account to follow users"
      />
      <Box>
        <Grid container className={styles.profileContainer}>
          <Grid
            item
            xs={12}
            direction={{ md: "row", sm: "column", xs: "column" }}
            sx={{
              display: "flex",
              alignItems: { md: "center", sm: "start", xs: "start" },
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
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"end"}
              marginTop={{ md: "0px", sm: "8px", xs: "8px" }}
            >
              {isCurrentUser && !editing && (
                <Button
                  label={"Edit Profile"}
                  variant="outlined"
                  style="primary"
                  sx={{
                    height: "48px",
                    width: { md: "160px", sm: "100%", xs: "100%" },
                  }}
                  onClick={handleEditClick}
                />
              )}
              {!isCurrentUser && (
                <Button
                  label={isFollowing ? "Unfollow" : "Follow"}
                  variant="outlined"
                  style="primary"
                  sx={{
                    height: "48px",
                    width: { md: "160px", sm: "100%", xs: "100%" },
                  }}
                  onClick={isFollowing ? handleUnfollow : handleFollow}
                />
              )}

              {isCurrentUser && editing && (
                <Button
                  label={"Save"}
                  variant="contained"
                  style="primary"
                  sx={{
                    height: "48px",
                    width: { md: "160px", sm: "100%", xs: "100%" },
                  }}
                  onClick={handleSaveClick}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ padding: "24px" }}>
            <div>
              <h6 className={styles.profileLabels}>About</h6>
              {isCurrentUser && editing ? (
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
              ) : (
                <p className={styles.infoText}>
                  {bio || "This user does not have a bio yet."}
                </p>
              )}
            </div>
            <h6 className={styles.profileLabels}>Username:</h6>
            <p className={styles.infoText}>{user?.username}</p>
            {isCurrentUser ? (
              <FormControl className={styles.formControl}>
                {isCurrentUser && (
                  <>
                    {editing && (
                      <label>
                        To update your password, please enter your old password
                        and your new password.
                      </label>
                    )}
                    <h6 className={styles.profileLabels}>Current Password:</h6>
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
                        <h6 className={styles.profileLabels}>New Password:</h6>
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
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Box>
    </TabPanel>
  );
};

export default ProfilePanel;
