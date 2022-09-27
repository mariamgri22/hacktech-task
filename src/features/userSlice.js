import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userLogin } from "./userLogin";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

export const getUser = createAsyncThunk("users/get", async () => {
  const res = await axios.get(
    "https://alignee.appspot.com/api/v1/okr/objectives",
    { Authorization: `Bearer ${userToken}` }
  );
  return res;
});

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  dataObjectives: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getUser.fulfilled]: (state, action) => {
      console.log("🚀 ~ file: store.js ~ line 32 ~ action", action.payload);

      state.dataObjectives = action.payload;
    },
  },
});
export default userSlice.reducer;
