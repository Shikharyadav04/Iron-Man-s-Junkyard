// App.jsx
import './index.css'; // or './App.css' if that's where Tailwind is imported

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider"; // Ensure this path is correct
import Navbar from "./components/Navbar"; // Ensure you have this component
import Home from "./pages/Home"; // Update to the correct path
import About from "./pages/About"; // Update to the correct path
import Buy from "./pages/Buy"; // Update to the correct path
import Login from "./pages/Login"; // Update to the correct path
import Register from "./pages/register"; // Update to the correct path
import Feedback from "./pages/Feedback"; // Update to the correct path
import Admin from "./pages/Admin"; // Update to the correct path
import Customer from "./pages/Customer"; // Update to the correct path
import Dealer from "./pages/Dealer"; // Update to the correct path
import NotFound from "./pages/NotFound"; // Update to the correct path
import End from "./components/End"; // Update to the correct path

const App = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Role-based routes */}
          <Route
            path="/admin"
            element={
              user?.role === "admin" ? <Admin /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/customer"
            element={
              user?.role === "customer" ? <Customer /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/dealer"
            element={
              user?.role === "dealer" ? <Dealer /> : <Navigate to="/login" />
            }
          />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <End />
    </div>
  );
};

export default App;
