import React, { useContext, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./profile";
import Error404 from "../components/error404/error404";
import { UserContext } from "../contextProviders/user/UserContext";
import { Box } from "@mui/system";
import VerticalTabs from "../components/verticalTabs/verticalTabs";
import ProfilePanel from "./panels/profilePanel/profilePanel";
import FavoritesPanel from "./panels/favoritesPanel/favoritesPanel";
import { getUserById } from "../../service/users/userService";
import { User } from "../types/user";

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const { id } = useParams();
  const currentUser = useContext(UserContext);
  const [user, setUser] = useState<User | undefined>();
  const tabs = ["Profile", "Favorites"];
  useEffect(() => {
    if (id) {
      getUserById(id).then((res) => {
        setUser(res.data.user);
      });
    }
    if (!id && currentUser) {
      setUser(currentUser);
    }
    console.log(user);
  }, []);

  const getPanel = (u: User) => {
    switch (tabValue) {
      case 0:
        return <ProfilePanel value={tabValue} user={user} />;
      case 1:
        return <FavoritesPanel value={tabValue} />;
    }
  };

  return user ? (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <VerticalTabs
        value={tabValue}
        setValue={setTabValue}
        tabs={tabs}
      ></VerticalTabs>
      {getPanel(user)}
    </Box>
  ) : (
    <Error404 />
  );
};

export default Profile;
