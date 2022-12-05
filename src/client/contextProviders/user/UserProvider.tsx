import React, { PropsWithChildren, ReactNode } from "react";
import { UserContext } from "./UserContext";

type ProviderProps = PropsWithChildren<{ user: { user: Object } }>;

const UserProvider = ({ user, children }: ProviderProps) => {
  return <UserContext.Provider value={user}> {children} </UserContext.Provider>;
};

export default UserProvider;
