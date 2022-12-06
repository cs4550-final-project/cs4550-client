import React from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./profile";

const Profile = () => {
  const location = useLocation();
  const userId = location.state.id;
  return <div className="">userId: {userId}</div>;
};

export default Profile;
