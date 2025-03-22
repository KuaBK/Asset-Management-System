import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import "./App.css";
import Login from "./components/Login";
import Home from "./pages/Home";
import OverView from "./components/OverView";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<Navigate to="/home/overview" replace />} />
          <Route path="overview" element={<OverView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
