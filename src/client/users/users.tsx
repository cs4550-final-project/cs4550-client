import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import styles from "./users.module.scss";
import { Typography, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { User } from "../types/user";
import { getAllUsers } from "../../service/users/userService";
import { UserContext } from "../contextProviders/user/UserContext";
import UserTileList from "../components/userTileList/userTileList";

const Users = () => {
  const [user, setUser] = useState<User | undefined>();
  const [users, setUsers] = useState<User[] | undefined>();
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
          {users && users.length !== 1
            ? `${Object.keys(users).length - 1} Recipeasy Users`
            : `1 Recipeasy User`}
        </Typography>
      </Box>
      <Divider />
      <Grid py={1} container spacing={2} className={styles.homeContainer}>
        {/* {user && users && <UserTileList currentUser={user} users={users} />} */}
      </Grid>
    </Box>
  );
};

export default Users;
