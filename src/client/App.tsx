import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UserProvider from "./contextProviders/user/UserProvider";
import "./App.scss";
import Nav from "./components/nav/nav";
import Home from "./home/home";
import Guide from "./guide/guide";
import Profile from "./profile/profile";
import Store from "./store/store";
import SignIn from "./auth/signIn/signIn";
import SignUp from "./auth/signUp/signUp";
import ProductDetails from "./productDetails/productDetails";
import { User } from "./types/user";

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  return (
    <UserProvider user={user}>
      <Nav></Nav>
      <Box sx={{ ml: 12, mr: 12, mt: 2, mb: 2 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />

          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/store" element={<Store />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Box>
    </UserProvider>
  );
}

export default App;
