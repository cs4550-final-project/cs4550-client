import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import TabPanel, { TabPanelProps } from "../../../components/tabPanel/tabPanel";
import { UserContext } from "../../../contextProviders/user/UserContext";

const ProfilePanel = (props: TabPanelProps) => {
  const currentUser = useContext(UserContext);
  const userId = useParams();
  const isCurrentUser = !userId || userId.toString() == currentUser?._id;
  return <TabPanel value={props.value}>profile panel</TabPanel>;
};

export default ProfilePanel;
