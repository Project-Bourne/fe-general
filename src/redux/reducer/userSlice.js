import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user: {},
    dropDown: 'all',
    dropDownName: 'All',
    roles: [],
    deleteStatus: false,
  },

  reducers: {
    setSingleUser: (state, action) => {
      state.user = action.payload;
    },
    setUpdatedData: (state, action) => {
        // Update user data in the Redux store here
        // For example, you can update specific fields like this:
        state.user.firstName = action.payload.firstName;
        state.user.lastName = action.payload.lastName;
        state.user.roleUuid = action.payload.role;
        state.user.roleName = action.payload.roleName;
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
      },
      setDeleteStatus: (state, action) => {
        state.deleteStatus = action.payload;
      },
  },
});

export const {
    setAllUsers,
    setSingleUser,
    setDropDown,
    setDropDownName,
    setUpdatedData,
    updateSingleUser,
    setRoles,
    setDeleteStatus,
} = UserSlice.actions;

export default UserSlice.reducer;
