import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,


}
const userSlice = createSlice({

  name: "user",
  initialState,
  reducers: {
    signInLoading: (state) => {
      state.loading = true;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;

    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state, action) => {
      state.loading = true;
    },

  }
})

export const { signInSuccess, signInFailure, signInLoading, updateUserFailure, updateUserSuccess, updateUserStart } = userSlice.actions
export default userSlice.reducer; 