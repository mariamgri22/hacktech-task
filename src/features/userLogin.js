import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const REACT_APP_BACKEND_API_URL_USERS_ORGANIZATIONS =
  "https://alignee.appspot.com/api/v1/accounts/login/";
// userActions.js
export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        REACT_APP_BACKEND_API_URL_USERS_ORGANIZATIONS,
        { email, password },
        config
      );
    
      localStorage.setItem("userToken", data.userToken);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
