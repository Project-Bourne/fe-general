import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user: {}
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
  },
});

export const {
    setSingleUser,
    updateSingleUser,
} = UserSlice.actions;

export default UserSlice.reducer;
