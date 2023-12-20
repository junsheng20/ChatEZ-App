import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "https://chat-app.leejunsheng7.repl.co"

// Async thunk for creating a new user
export const createUser = createAsyncThunk(
    "users/create",
    async (data) => {
        const response = await axios.post(`${BASE_URL}/users`, data )
        return response.data;
    }
)

// Async thunk for searching users
export const fetchUsersByDisplayName = createAsyncThunk(
    "users/fetchUsersByDisplayName",
    async (displayName) => {
        const response = await axios.get(`${BASE_URL}/users/search/${displayName}`)
        return response.data;
    }
)

// Async thunk for checking user exists
export const checkUser = createAsyncThunk(
  "users/check",
  async (uid) => {
    const response = await axios.get(`${BASE_URL}/users/${uid}`)
    return response.data
  }
)

// Async thunk for updating photourl
export const updateUserPhotoURL = createAsyncThunk(
  "users/updatePhotoURL",
  async ({photourl,uid}) => {
    const response = await axios.put(`${BASE_URL}/users/photourl/${uid}`, photourl)
    return response.data
  }
)

// Async thunk for updating displayname
export const updateUserDisplayName = createAsyncThunk(
  "users/updateDisplayName",
  async ({displayname, uid}) => {
    const response = await axios.put(`${BASE_URL}/users/displayName/${uid}`, displayname)
    return response.data
  }
)

const usersSlice = createSlice({
    name: "users",
    initialState: { users: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createUser.fulfilled, (state, action) => {
          state.users = action.payload;
        })
        .addCase(fetchUsersByDisplayName.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUsersByDisplayName.fulfilled, (state, action) => {
          state.users = action.payload;
          state.loading = false;
        });
    },
  });
  

const usersReducer = usersSlice.reducer;
export default usersReducer;