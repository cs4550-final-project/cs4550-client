import apiUrl from "../apiConfig";
import axios from "axios";

export const signUp = (user) => {
  return axios({
    method: "POST",
    url: apiUrl + "/sign-up",
    data: {
      user: {
        username: user.username,
        password: user.password,
        password_confirmation: user.passwordConfirmation,
        role: user.role,
      },
    },
  });
};

export const signIn = (user) => {
  return axios({
    url: apiUrl + "/sign-in",
    method: "POST",
    data: {
      user: {
        username: user.username,
        password: user.password,
      },
    },
  });
};

export const signOut = (user) => {
  return axios({
    url: apiUrl + "/sign-out",
    method: "DELETE",
    headers: {
      Authorization: `Token token=${user.token}`,
    },
  });
};

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + "/change-password",
    method: "PATCH",
    headers: {
      Authorization: `Token token=${user.token}`,
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword,
      },
    },
  });
};
