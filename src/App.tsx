import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./home/home";
import Profile from "./profile/profile";
import Store from "./store/store";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/stores/:id" element={<Store />} />
      </Routes>
    </div>
  );
}

export default App;
