import React, { PropsWithChildren } from "react";
import { UserContext } from "./UserContext";

type ProviderProps = PropsWithChildren<{ user: Object | undefined }>;

const UserProvider = ({ user, children }: ProviderProps) => {
  return <UserContext.Provider value={user}> {children} </UserContext.Provider>;
};

export default UserProvider;
