import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user: {},
    dropDown: '',
    dropDownName: ''
  },

  reducers: {
    setSingleUser: (state, action) => {
      state.user = action.payload;
    },
    updateSingleUser: (state, action) => {
        // Update user data in the Redux store here
        // For example, you can update specific fields like this:
        state.user.firstName = action.payload.firstName;
        state.user.lastName = action.payload.lastName;
        state.user.email = action.payload.email;
      },
      setDropDown: (state, action) => {
        state.dropDown = action.payload;
      },
      setDropDownName: (state,action) => {
        state.dropDownName = action.payload
      }
  },
});

export const {
    setAllUsers,
    setSingleUser,
    updateSingleUser,
    setDropDown,
    setDropDownName
} = UserSlice.actions;

export default UserSlice.reducer;
