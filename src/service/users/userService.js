import axios from "axios";
import apiUrl from "../apiConfig";

export const getUserById = (id) => {
  return axios({
    method: "GET",
    url: apiUrl + "/users/" + id,
  });
};

export const getAllUsers = (id) => {
  return axios({
    method: "GET",
    url: apiUrl + "/users",
  });
};

export const getFollowing = async (id) => {
  const following = await axios({
    method: "GET",
    url: apiUrl + "/users/" + id + "/following",
  });
  return following.data;
};

export const updateFollowing = (payload, user) => {
  return axios({
    method: "PATCH",
    url: apiUrl + "/following",
    headers: {
      Authorization: `Token token=${user.token}`,
    },
    data: payload,
  });
};

export const updateFavorites = (payload, user) => {
  return axios({
    method: "PATCH",
    url: apiUrl + "/favorites",
    headers: {
      Authorization: `Token token=${user.token}`,
    },
    data: payload,
  });
};

export const updateUserInfo = (payload, user) => {
  console.log(payload);
  return axios({
    method: "PATCH",
    url: apiUrl + "/update-info",
    headers: {
      Authorization: `Token token=${user.token}`,
    },
    data: payload,
  });
};
