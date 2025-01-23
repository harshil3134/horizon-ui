import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/App.css';
import {Provider} from "react-redux"

import App from './App';
import store from 'components/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from 'components/store';

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
  <Provider store={store}>

<PersistGate loading={null} persistor={persistor}>

    <App />
 </PersistGate>
    </Provider>
  </BrowserRouter>,
);

export const useAuth=()=>{
  return useContext(AuthContext)
}