import React, { useEffect, useState } from 'react'

import { useAuth } from 'index.js'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';




function ProtectedRoutes({children}) {


const isAuth=useSelector((state)=>{
    return state.user.isAuthenticated;
  })


useEffect(()=>{
    console.log("inside useeffect",isAuth)

},[isAuth])


// console.log("inside auth routes",isAuth)
// if(flag==null)
// {

// }
// else if(!isAuth)
// {
// return <Navigate to='/sign-in' replace/>
// }
// return children
// console.log("inside auth routes",isAuth)

if(isAuth===false)
{
    return <Navigate to='/sign-in' replace/>
}
else{
return children
}
}

export default ProtectedRoutes
