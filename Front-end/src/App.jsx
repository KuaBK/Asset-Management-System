import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
import Login from "./components/Login";
import Home from "./pages/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
