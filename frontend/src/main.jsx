import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import { SocketProvider } from "./context/SocketProvider";
import { LoaderProvider } from "./context/LoaderContext"; // Import the LoaderProvider
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <LoaderProvider> {/* Wrap LoaderProvider here */}
          <ErrorBoundary>
            <Loader /> 
            <App />
          </ErrorBoundary>
        </LoaderProvider>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
);
