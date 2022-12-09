import axios from "axios";
import apiUrl from "../apiConfig";
const mockUser = {
  _id: "6383fc7204f869887c676b98",
  favorites: [],
  createdAt: "2022-11-28T00:10:26.248+00:00",
  updatedAt: "2022-11-28T00:10:26.248+00:00",
  __v: 0,
  username: "britney",
};

export const getUserById = (id) => {
  return axios({
    method: "GET",
    url: apiUrl + "/users/" + id,
  });
};

export const updateUserInfo = (payload, user) => {
  return axios({
    method: "PATCH",
    url: apiUrl + "/update-info",
    headers: {
      Authorization: `Token token=${user.token}`,
    },
    data: payload,
  });
};
