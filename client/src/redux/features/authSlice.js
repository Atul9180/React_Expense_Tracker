import { createSlice } from "@reduxjs/toolkit";
import { generateUserName } from "../../utils/generateUserNameUtil";

const initialState = {
  isLoggedIn: false,
  user: "",
  email: null,
  userName: null,
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      console.log(action.payload);
      const { email, userID, userName } = action.payload;

      state.user = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userID = userID;
      state.userName = userName || generateUserName(email);
    },
  },
});

export const { SET_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectedUser = (state) => state.auth.user;
export const selectUserId = (state) => state.auth.userId;
export const selectUserName = (state) => state.auth.userName;
export const selectUserEmail = (state) => state.auth.email;

export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// import {
//   signupAsyncThunk,
//   loginAsyncThunk,
//   logoutAsyncThunk,
// } from "./authThunk";

// const initialState = {
//   user: "",
//   loading: false,
//   error: null,
// };

// const genericHandleAsyncThunkAction = (state, action) => {
//   state.loading = false;
//   state.error = action.error ? action.error.message : null;
//   if (!action.error) {
//     state.user = action.payload || null;
//   }
// };

// const authSlice = createSlice({
//   name: "userAuth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     setLoading: (state) => {
//       state.loading = true;
//       state.error = null;
//     },
//     setError: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(signupAsyncThunk.fulfilled, (state, action) => {
//         genericHandleAsyncThunkAction(state, action);
//       })
//       .addCase(signupAsyncThunk.rejected, (state, action) => {
//         genericHandleAsyncThunkAction(state, action);
//       })
//       .addCase(loginAsyncThunk.fulfilled, (state, action) => {
//         genericHandleAsyncThunkAction(state, action);
//       })
//       .addCase(loginAsyncThunk.rejected, (state, action) => {
//         genericHandleAsyncThunkAction(state, action);
//       })
//       .addCase(logoutAsyncThunk.fulfilled, (state) => {
//         state.user = "";
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(logoutAsyncThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setError, setLoading, setUser } = authSlice.actions;

// export default authSlice.reducer;
