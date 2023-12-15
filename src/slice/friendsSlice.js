import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const BASE_URL = "https://chat-app.leejunsheng7.repl.co"

// Async thunk for creating new friendship
export const createFriend = createAsyncThunk(
    "friends/Create",
    async (data) => {
        const response = await axios.post(`${BASE_URL}/friends`, data )
        return response.data;
    }
)

// Async thunk for checking friendship exists
export const checkFriend = createAsyncThunk(
    "friends/Check",
    async (combinedid) => {
        const response = await axios.get(`${BASE_URL}/friends/${combinedid}`)
        return response.data
    }
)

const friendsSlice = createSlice({
    name: "friends",
    initialState: { friends: [], friendship: null, loading: false },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(checkFriend.fulfilled, (state, action) => {
          state.friendship = action.payload;
        })
        
        
    },
  });
  

const friendsReducer = friendsSlice.reducer;
export default friendsReducer;