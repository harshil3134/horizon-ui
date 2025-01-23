import React, { useEffect, useState } from 'react'

import { useAuth } from 'index.js'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';




function AuthRoutes({children}) {

const isAuth=useSelector((state)=>{
    return state.user.isAuthenticated;
  })


useEffect(()=>{
    console.log("inside useeffect",isAuth)
},[isAuth])


// useEffect(()=>{
// setFlag(isAuthenticated)
// },[isAuthenticated])

// if(flag==null)
// {

// }
// else if(isAuthenticated)
// {
// return <Navigate to='/dashboard' replace/>
// }
// else{
// return children

// }
console.log("inside auth routes",isAuth)

if(isAuth)
{
    return <Navigate to='/dashboard' replace/>
}
else{
    return children
}

    
}

export default AuthRoutes
