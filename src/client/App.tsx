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
import { User } from "./types/user";
import RecipeDetails from "./recipeDetails/recipeDetails";

function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  return (
    <UserProvider user={user}>
      <Nav></Nav>
      <Box
        sx={{
          margin: {
            xl: "16px 180px",
            lg: "16px 160px",
            md: "16px 100px",
            sm: "16px 64px",
            xs: "16px 32px",
          },
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/details/:id" element={<RecipeDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Box>
    </UserProvider>
  );
}

export default App;
