import React, { useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./profile";
import Error404 from "../components/error404/error404";
import { UserContext } from "../contextProviders/user/UserContext";
import { Box } from "@mui/system";
import VerticalTabs from "../components/verticalTabs/verticalTabs";
import ProfilePanel from "./panels/profilePanel/profilePanel";
import LikesPanel from "./panels/likesPanel/likesPanel";

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const tabs = ["Profile", "Likes"];

  const getPanel = () => {
    switch (tabValue) {
      case 0:
        return <ProfilePanel value={tabValue} />;
      case 1:
        return <LikesPanel value={tabValue} />;
    }
  };

  const panel = getPanel();

  return (
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
      {panel}
    </Box>
  );
};

export default Profile;
