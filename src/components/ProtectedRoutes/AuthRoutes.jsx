import React, { useEffect, useState } from 'react'

import { useAuth } from 'index.js'
import { Navigate } from 'react-router-dom'




function AuthRoutes({children}) {

const {isAuthenticated}=useAuth()
const [flag,setFlag]=useState(null)

useEffect(()=>{
setFlag(isAuthenticated)
},[isAuthenticated])

if(flag==null)
{

}
else if(isAuthenticated)
{
return <Navigate to='/dashboard' replace/>
}
else{
return children

}
    
}

export default AuthRoutes
