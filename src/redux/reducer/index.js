import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from './userSlice'
import authSlice from './authReducer'

const rootReducer = combineReducers({ 
   user: UserSlice,
   auth: authSlice,
});

export default rootReducer;
