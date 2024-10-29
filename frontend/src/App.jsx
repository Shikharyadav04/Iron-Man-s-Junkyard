import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Buy from './pages/Buy';
import End from './components/End';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/register'; // Fixed capitalization
import Admin from './pages/Admin';
import Customer from './pages/Customer'; // Fixed typo
import NotFound from './pages/NotFound';
import Feedback from './pages/Feedback';
import Dealer from './pages/Dealer';
import  { useAuth } from './context/AuthProvider'; // Correct import

const App = () => {
  const { user } = useAuth(); // Access user state via useAuth hook
  console.log(user);

  return (
   
      <div
        
        
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={user ? <Admin /> : <Navigate to="/login" />}
          />
          <Route
            path="/customer"
            element={user ? <Customer /> : <Navigate to="/login" />}
          />
          <Route path="/feedback" element={<Feedback />} />
          <Route
            path="/dealer"
            element={user ? <Dealer /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <End />
      </div>
    
  );
};

export default App;
