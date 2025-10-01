import { createSlice } from "@reduxjs/toolkit";


const token  =localStorage.getItem("token");
const userId = localStorage.getItem("userId")
   
const authSlice = createSlice({
 name:"auth",
    initialState:{
        token:token || null,
        userId:userId ||null,
        isLoggedIn: !token,
    },

    reducers:{
   logIn :(state,action)=>{
     state.token = action.payload.token,
     state.userId = action.payload.userId,///////////////////////////////////////////////////////////////////////
     state.isLoggedIn = true
     localStorage.setItem("token",action.payload.token);
     localStorage.setItem("userId",action.payload.userId);
     console.log("tttttttttttttt",state.userId);
     

   },
   logout: (state) => {
    state.token = null;
    state.userId = null;
    state.isLoggedIn = false;
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  },

    }
})

export const {logIn,logout} = authSlice.actions
export default authSlice.reducer