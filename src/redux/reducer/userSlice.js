import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user: {},
    dropDown: 'all',
    dropDownName: 'All',
    roles: [],
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
        state.user.role = action.payload.role;
        state.user.image = action.payload.image;
        state.user.country = action.payload.country;
        state.user.password = action.payload.password;

      },
      setDropDown: (state, action) => {
        state.dropDown = action.payload;
      },
      setDropDownName: (state,action) => {
        state.dropDownName = action.payload
      },
      setRoles: (state, action) => {
        state.roles = action.payload;
      }
  },
});

export const {
    setAllUsers,
    setSingleUser,
    updateSingleUser,
    setDropDown,
    setDropDownName,
    setUpdatedData,
    setRoles
} = UserSlice.actions;

export default UserSlice.reducer;
