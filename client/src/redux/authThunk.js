import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  signUpWithEmailPassword,
  loginWithEmailPassword,
  logOutUserWithEmailPasword,
} from "../services/authService";

//Generic Async auth actions :
const asyncAuthAction = async (actionFunction, args) => {
  const result = await actionFunction(...args);
  if (result?.success) {
    return result?.user;
  } else {
    throw new Error(result.error);
  }
};

//Async Thunk for SignUp:
export const signupAsyncThunk = createAsyncThunk(
  "auth/signup",
  async ({ email, password, displayName }) => {
    return asyncAuthAction(signUpWithEmailPassword, [
      email,
      password,
      displayName,
    ]);
  }
);

//Async Thunk for LogIn::
export const loginAsyncThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    return asyncAuthAction(loginWithEmailPassword, [email, password]);
  }
);

//logout Thunk:
export const logoutAsyncThunk = createAsyncThunk("auth/logout", async () => {
  return asyncAuthAction(logOutUserWithEmailPasword, []);
});

// //Async Thunk for SignUp:
// export const signupAsyncThunk = createAsyncThunk(
//   "auth/signup",
//   async ({ email, password, displayName }) => {
//   const result=await signUpWithEmailPassword(email,password,displayName);
//   if(result?.success){
//     return result.user;
//   }
//   else{
//     throw new Error(result?.error)
//   }
//   }
// );

// //Async Thunk for LogIn::
// export const loginAsyncThunk=createAsyncThunk(
//   "auth/login",
//   async ({email,password})=>{
//     const result=await loginWithEmailPassword(email,password);
//     if(result?.success){
//       return result?.user
//     }
//     else{
//       throw new Error(result.error);
//     }
//   }
// )

// //logout Thunk:
// export const logoutAsyncThunk=createAsyncThunk(
//   "auth/logout",
//   async ()=>{
//     const result=await logOutUserWithEmailPasword();
//     if(result?.success){
//       return null;
//     }
//     else{
//       throw new Error(result?.error)
//     }
//   }
// )
