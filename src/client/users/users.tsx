import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import styles from "./users.module.scss";
import { Typography, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { User } from "../types/user";
import { getAllUsers } from "../../service/users/userService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contextProviders/user/UserContext";

const Users = () => {
  const [user, setUser] = useState<User | undefined>();
  const [users, setUsers] = useState<User[] | undefined>();
  const navigateTo = useNavigate();
  const currentUser = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = getAllUsers();
      return allUsers;
    };
    fetchUsers().then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  return (
    <Box>
      <Box pb={2} className={styles.homeHeader}>
        <Typography variant="h6">
          {users ? `${Object.keys(users).length} Active Users` : <></>}
        </Typography>
      </Box>
      <Divider />
      <Grid py={1} container spacing={2} className={styles.homeContainer}>
        <Grid item md={9} sm={12} xs={12} className={styles.browseContainer}>
          <ul>
            {users ? (
              users
                .filter((_user) => _user._id !== user?._id)
                .map((user) => (
                  <li onClick={() => navigateTo(`/profile/${user._id}`)}>
                    {user.username}
                  </li>
                ))
            ) : (
              <></>
            )}
            {/* {users ? users.map((user) => <li>{user.username}</li>) : <></>} */}
          </ul>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Users;
