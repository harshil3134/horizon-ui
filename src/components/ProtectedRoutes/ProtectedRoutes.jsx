import React, { useEffect, useState } from 'react'

import { useAuth } from 'index.js'
import { Navigate } from 'react-router-dom'




function ProtectedRoutes({children}) {

const {isAuthenticated}=useAuth()
const [flag,setFlag]=useState(null)

useEffect(()=>{
setFlag(isAuthenticated)
},[isAuthenticated])

if(flag==null)
{

}
else if(!isAuthenticated)
{
return <Navigate to='/sign-in' replace/>
}
return children

}

export default ProtectedRoutes
