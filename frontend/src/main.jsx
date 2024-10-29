import React from "react";
import ReactDom from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import  AuthProvider  from "./context/AuthProvider.jsx";



ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
      
    
    
    
  </BrowserRouter>
)