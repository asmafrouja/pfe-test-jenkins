import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  user: null, // This will hold user details, including the token
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set user details, including token
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
    // Action to clear user details (e.g., on logout)
    clearUserDetails: (state) => {
      state.user = null;
    },
  },
});

// Export the action creators
export const { setUserDetails, clearUserDetails } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
