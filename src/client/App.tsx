import Box from "@mui/material/Box";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./home/home";
import Profile from "./profile/profile";
import Store from "./store/store";

function App() {
  return (
    <Box sx={{ ml: 12, mr: 12, mt: 2, mb: 2 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/stores/:id" element={<Store />} />
      </Routes>
    </Box>
  );
}

export default App;
