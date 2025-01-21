import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/App.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AuthContext=createContext();

export const AuthProvider=({children})=>{

 const [isAuthenticated,setIsAuthenticated]=useState(false)

const login=()=>{
  setIsAuthenticated(true)
}

const logout=()=>{

  setIsAuthenticated(false)
  localStorage.setItem("email","")
}
useEffect(()=>{
  console.log("isauth",isAuthenticated)
},[isAuthenticated])

useEffect(()=>{
  const user_email=localStorage.getItem("email")
  if(user_email!=="")
  {
    setIsAuthenticated(true)
  }
  
},[])

return(
  <AuthContext.Provider  value={{isAuthenticated,login,logout}}>
    {children}
    </AuthContext.Provider>
)
}



root.render(
  <BrowserRouter>
<AuthProvider>
    <App />
    </AuthProvider>
  </BrowserRouter>,
);

export const useAuth=()=>{
  return useContext(AuthContext)
}