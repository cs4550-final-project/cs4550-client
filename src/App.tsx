import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./home/home";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
