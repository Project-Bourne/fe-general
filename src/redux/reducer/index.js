import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from './userSlice'

const rootReducer = combineReducers({ 
   user: UserSlice,
});

export default rootReducer;
