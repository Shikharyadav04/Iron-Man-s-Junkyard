import "./index.css"; // or './App.css' if that's where Tailwind is imported
import React, { useState } from "react";
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
import Business from "./pages/Business"; // Update to the correct path
import Contact from "./pages/Contact"; // Update to the correct path
import News from "./components/News"; // Update to the correct path
import RequestCreation from "./pages/customer/requestCreation"; // Update to the correct path
import BillPage from "./pages/customer/bill/BillPage"; // Import the BillPage component
import getRequest from "./pages/dealer/getRequest";
import GetAcceptedRequest from "./pages/acceptedRequest/getAcceptedRequest";
import AcceptedBillPage from "./pages/customer/bill/AcceptedRequests";
import CompletedBillPage from "./pages/customer/bill/CompletedBillPage";
import ChatList from "./components/ChatList";
import DealerChatList from "./components/DealerChatList";
import DealerRegister from "./pages/DealerRegister";
import Success from "./pages/Success";
import DealerRequests from "./pages/DealerRequests";
const App = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Function to render role-based routes
  const renderRoleBasedRoute = (role, Component) => {
    return user?.role === role ? <Component /> : <Navigate to="/login" />;
  };

  return (
    <div>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        user={user} // Pass user prop to check if logged in
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dealerreg" element={<DealerRegister />} />
        <Route path="/success" element={<Success />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />
        <Route path="/business" element={<Business />} />
        <Route path="//unverified-dealer" element={<DealerRequests />} />
        {/* Role-based routes */}
        <Route path="/admin" element={renderRoleBasedRoute("admin", Admin)} />
        <Route
          path="/customer"
          element={renderRoleBasedRoute("customer", Customer)}
        />
        <Route
          path="/dealer"
          element={renderRoleBasedRoute("dealer", Dealer)}
        />

        {/* BillPage route */}
        <Route
          path="/customer/bills"
          element={renderRoleBasedRoute("customer", BillPage)} // Adjust role as needed
        />
        {/* RequestPage route */}
        <Route
          path="/dealer/requests"
          element={renderRoleBasedRoute("dealer", getRequest)} // Adjust role as needed
        />
        <Route
          path="/dealer/acceptedRequests"
          element={renderRoleBasedRoute("dealer", GetAcceptedRequest)} // Adjust role as needed
        />
        <Route
          path="/customer/acceptedRequests"
          element={renderRoleBasedRoute("customer", AcceptedBillPage)} // Adjust role as needed
        />

        <Route
          path="/customer/completedRequests"
          element={renderRoleBasedRoute("customer", CompletedBillPage)} // Adjust role as needed
        />

        <Route
          path="/customer/request-creation"
          element={renderRoleBasedRoute("customer", RequestCreation)}
        />
        <Route path="/chats" element={<ChatList userId={user?._id} />} />
        <Route
          path="/dealerChats"
          element={<DealerChatList userId={user?._id} />}
        />
        {/* Redirect based on user role when not logged in */}
        <Route
          path="/redirect"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : user.role === "dealer" ? (
                <Navigate to="/dealer" />
              ) : (
                <Navigate to="/customer" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <End />
    </div>
  );
};

export default App;
