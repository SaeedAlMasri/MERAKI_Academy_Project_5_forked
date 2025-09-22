import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
 import itemsReducer from "./itemSlice"
export default configureStore({

    reducer:{
   auth :authReducer,
   items:itemsReducer

    }
})