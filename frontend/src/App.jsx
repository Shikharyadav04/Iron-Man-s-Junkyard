import "./index.css"; // or './App.css' if that's where Tailwind is imported
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Buy from "./pages/Buy";
import Login from "./pages/Login";
import Register from "./pages/register"; // Corrected path casing
import Feedback from "./pages/Feedback";
import Admin from "./pages/Admin";
import Customer from "./pages/Customer";
import Dealer from "./pages/Dealer";
import NotFound from "./pages/NotFound";
import End from "./components/End";
import Business from "./pages/Business";
import Contact from "./pages/Contact";
import News from "./components/News";
import RequestCreation from "./pages/customer/RequestCreation"; // Adjusted path casing
import BillPage from "./pages/customer/bill/BillPage";
import getRequest from "./pages/dealer/GetRequest"; // Adjusted path casing
import GetAcceptedRequest from "./pages/acceptedRequest/GetAcceptedRequest";
import AcceptedBillPage from "./pages/customer/bill/AcceptedRequests"; // Corrected import path for AcceptedBillPage
import CompletedBillPage from "./pages/customer/bill/CompletedBillPage";
import DealerRegister from "./pages/DealerRegister"; // Import DealerRegister if used in routes
import Success from "./pages/Success"; // Corrected Success page name
import ChatList from "./components/ChatList"; // Import ChatList if used in routes
import DealerChatList from "./components/DealerChatList"; // Import DealerChatList if used in routes

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
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />
        <Route path="/business" element={<Business />} />
        <Route path="/success" element={<Success />} /> {/* Corrected Success route */}

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
          element={renderRoleBasedRoute("customer", BillPage)}
        />
        {/* RequestPage route */}
        <Route
          path="/dealer/requests"
          element={renderRoleBasedRoute("dealer", getRequest)}
        />
        <Route
          path="/dealer/acceptedRequests"
          element={renderRoleBasedRoute("dealer", GetAcceptedRequest)}
        />
        <Route
          path="/customer/acceptedRequests"
          element={renderRoleBasedRoute("customer", AcceptedBillPage)}
        />
        <Route
          path="/customer/completedRequests"
          element={renderRoleBasedRoute("customer", CompletedBillPage)}
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
