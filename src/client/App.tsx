import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UserProvider from "./contextProviders/user/UserProvider";
import "./App.scss";
import Nav from "./components/nav/nav";
import Home from "./home/home";
import Profile from "./profile/profile";
import Store from "./store/store";

function App() {
  const [user, setUser] = useState<Object | undefined>(undefined);
  return (
    <UserProvider user={user}>
      <div>
        <Nav></Nav>
        <Box sx={{ ml: 12, mr: 12, mt: 2, mb: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stores" element={<Store />} />
          </Routes>
        </Box>
      </div>
    </UserProvider>
  );
}

export default App;
