import React, { useEffect, useState, useContext } from "react";
import styles from "./users.module.scss";
import { Typography, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import { User } from "../types/user";
import { getAllUsers } from "../../service/users/userService";
import { UserContext } from "../contextProviders/user/UserContext";
import UserPageTileList from "../components/userTileList/userPageTileList";
const Users = () => {
  const [users, setUsers] = useState<User[] | undefined>();
  const currentUser = useContext(UserContext);

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
      <Box pb={2} className={styles.usersHeader}>
        <Typography variant="h6">
          {users && users.length !== 1
            ? `${
                currentUser
                  ? Object.keys(users).length - 1
                  : Object.keys(users).length
              } Recipeasy Users`
            : `1 Recipeasy User`}
        </Typography>
      </Box>
      <Divider />
      {users && <UserPageTileList users={users} />}
    </Box>
  );
};

export default Users;
