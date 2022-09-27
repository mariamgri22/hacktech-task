import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


const REACT_APP_BACKEND_API_URL_USERS_ORGANIZATIONS =
  "https://alignee.appspot.com/api/v1/accounts/";


export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (arg, { getState, rejectWithValue }) => {
      try {
    
        const { user } = getState()
  
    
        const config = {
          headers: {
            Authorization: `Bearer ${user.userToken}`,
          },
        }
        const { data } = await axios.get(REACT_APP_BACKEND_API_URL_USERS_ORGANIZATIONS, config)
        return data
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )