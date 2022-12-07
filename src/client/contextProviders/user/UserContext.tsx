import React from "react";
import { User } from "../../types/user";

const UserContext = React.createContext<User | undefined>(undefined);

export { UserContext };
