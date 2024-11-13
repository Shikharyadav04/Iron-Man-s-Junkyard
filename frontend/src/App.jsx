import "./index.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Buy from "./pages/Buy";
import Login from "./pages/Login";
import Register from "./pages/register";
import Feedback from "./pages/Feedback";
import Admin from "./pages/Admin";
import Customer from "./pages/Customer";
import Dealer from "./pages/Dealer";
import NotFound from "./pages/NotFound";
import End from "./components/End";
import Business from "./pages/Business";
import SubscriptionPage from "./pages/SubscriptionPage";
import News from "./components/News";
import RequestCreation from "./pages/customer/requestCreation";
import BillPage from "./pages/customer/bill/BillPage";
import getRequest from "./pages/dealer/getRequest";
import GetAcceptedRequest from "./pages/acceptedRequest/getAcceptedRequest";
import AcceptedBillPage from "./pages/customer/bill/AcceptedRequests";
import CompletedBillPage from "./pages/customer/bill/CompletedBillPage";
import DealerRegister from "./pages/DealerRegister";
import Success from "./pages/Success";
import DealerRequests from "./pages/DealerRequests";
import ChatRoom from "./components/ChatRoom";
import ChatRooms from "./components/ChatRooms";
import Stats from "./pages/Stats";
import PricingPage from "./pages/PricingPage";
import SplashScreen from "./components/SplashScreen";
import UserSearchPage from "./components/adminUsers/UserSearchPage";
import "../src/components/Custome.css";
import ThankYou from "./components/ThankYou";

const App = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const handleVideoEnd = () => {
    setShowSplash(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderRoleBasedRoute = (role, Component) => {
    return user?.role === role ? <Component /> : <Navigate to="/login" />;
  };

  return (
    <div>
      {showSplash ? (
        <SplashScreen onVideoEnd={handleVideoEnd} />
      ) : (
        <>
          <Navbar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            user={user}
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
            <Route
              path="/SubscriptionPage"
              element={user ? <SubscriptionPage /> : <Navigate to="/login" />}
            />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/news" element={<News />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/business" element={<Business />} />
            <Route path="/unverified-dealer" element={<DealerRequests />} />
            <Route
              path="/user-search"
              element={renderRoleBasedRoute("admin", UserSearchPage)}
            />
            <Route
              path="/admin"
              element={renderRoleBasedRoute("admin", Admin)}
            />
            <Route
              path="/customer"
              element={renderRoleBasedRoute("customer", Customer)}
            />
            <Route
              path="/dealer"
              element={renderRoleBasedRoute("dealer", Dealer)}
            />
            <Route
              path="/customer/bills"
              element={renderRoleBasedRoute("customer", BillPage)}
            />
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
            <Route path="/chats" element={<ChatRooms />} />
            <Route path="/chat/:roomId" element={<ChatRoom />} />
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
        </>
      )}
    </div>
  );
};

export default App;
