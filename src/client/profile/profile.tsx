import React from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "./profile";
import Error404 from "../components/error404/error404";

const Profile = () => {
  const location = useLocation();
  const userId = location.state?.id;

  return userId ? <div className="">userId: {userId}</div> : <Error404 />;
};

export default Profile;
