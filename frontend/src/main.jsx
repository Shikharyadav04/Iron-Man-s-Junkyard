import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import SocketProvider from "./context/SocketProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
import ErrorBoundary from "./components/ErrorBoundary";
root.render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
);
