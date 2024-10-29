import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Buy from './pages/Buy';
import End from './components/End';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/register'; // Fixed capitalization here
import Admin from './pages/Admin';
import Customer from './pages/Customer'; // Fixed typo from "Coustomer" to "Customer"
import NotFound from './pages/NotFound';
import Feedback from './pages/Feedback';
import Dealer from './pages/Dealer';
import { AuthProvider } from './context/AuthProvider'; // Ensure you import AuthProvider

const App = () => {
  return (
    <AuthProvider> {/* Wrap everything inside AuthProvider */}
      <div
        className="sm:px-[5vw] md:px-[7vw] lg:px-[0vw]"
        style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}
      >
        <Navbar /> {/* Navbar can access Auth context */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/customer"
            element={<Customer />} // No need for conditional here
          />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/dealer" element={<Dealer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <End />
      </div>
    </AuthProvider>
  );
};

export default App;
