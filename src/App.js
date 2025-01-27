import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import {} from 'react-router-dom';

import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import SignInCentered from 'views/auth/signIn';
import {
  ChakraProvider,
  // extendTheme
} from '@chakra-ui/react';
import initialTheme from './theme/theme'; //  { themeGreen }
import { useState } from 'react';
import SignUp from 'views/auth/signUp';
import CustomRoutes from 'layouts/custom-routes';
import ProtectedRoutes from 'components/ProtectedRoutes/ProtectedRoutes';
import AuthRoutes from 'components/ProtectedRoutes/AuthRoutes';
import { useSelector } from 'react-redux';
import Pagenotfound from 'components/pagenotfound/Pagenotfound';


// Chakra imports

export default function Main() {
  // eslint-disable-next-line
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  

  const isAuth=useSelector((state)=>{
    return state.isAuthenticated;
  })

//   useEffect(()=>{
// setState(isAuth)
//   },[isAuth])

  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        {/* <Route path="auth/*" element={<AuthLayout />} /> */}
        <Route path='/sign-in' element={
          <AuthRoutes>
<SignInCentered/> 
          </AuthRoutes>
        }
          />
        <Route path='/sign-up' element={
          <AuthRoutes>
            <SignUp/>
          </AuthRoutes>
                    
          }/>
        <Route
          path="dashboard/*"
          element={
            <ProtectedRoutes>
                      <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
              </ProtectedRoutes>
            
            
          }
        />

        <Route path='custom-routes/*' element={
          <ProtectedRoutes>
<CustomRoutes theme={currentTheme} setTheme={setCurrentTheme} />
          </ProtectedRoutes>
          
          
          
          } />
        <Route
          path="rtl/*"
          element={

            <ProtectedRoutes>
<RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
            </ProtectedRoutes>
            
          }
        />
        {/* <Route path="/" element={state==null?null:isAuthenticated?<Navigate to="/dashboard"  />:<Navigate to="/sign-in"  />} /> */}
          <Route path="/" element={isAuth?<Navigate to="/dashboard"  />:<Navigate to="/sign-in"  />} />
          <Route path='*' element={<Pagenotfound/>}/>
      </Routes>
    </ChakraProvider>
  );
}