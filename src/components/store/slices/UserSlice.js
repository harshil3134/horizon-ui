
import { createSlice } from "@reduxjs/toolkit";

const initialState={

        isAuthenticated:false,
        userinfo:{},
        currentUser:"",
        token:"",
    
}
const generatetoken=()=>{
    const arr='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';


    let res=""
    let length=20
    for(let i=1;i<=length;i++)
    {
        const index=Math.floor(Math.random()*arr.length);
        res+=arr[index]
    }
    return res
        
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.currentUser=action.payload;
            state.token=generatetoken();
        },
        logout:(state,action)=>{
            state.isAuthenticated=false;
            state.currentUser="";
            state.token="";
        },   
        adduser:(state,action)=>{
      
           
            state.userinfo={...state.userinfo,[action.payload.email]:action.payload.pass}
        },

    }
})


export default userSlice.reducer;

export const {login,logout,adduser}=userSlice.actions;