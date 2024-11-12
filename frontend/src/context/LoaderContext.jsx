// LoaderContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const LoaderContext = createContext();

// Custom hook for accessing the context
export const useLoader = () => useContext(LoaderContext);

// Provider component to wrap around your app
export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // Show and hide loader functions
  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};
