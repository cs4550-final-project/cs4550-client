import React, { PropsWithChildren } from "react";
import { User } from "../../types/user";
import { UserContext } from "./UserContext";

type ProviderProps = PropsWithChildren<{ user: User | undefined }>;

const UserProvider = ({ user, children }: ProviderProps) => {
  return <UserContext.Provider value={user}> {children} </UserContext.Provider>;
};

export default UserProvider;
