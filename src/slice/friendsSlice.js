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

// Async thunk for fetching friends
export const fetchFriends = createAsyncThunk(
  "friends/fetch",
  async (currentUserid) => {
    const response = await axios.get(`${BASE_URL}/friends/chats/${currentUserid}`)
    return response.data
  }
)

// Async thunk for fetching friend details for title
export const fetchFriendDetails = createAsyncThunk(
  "friend/fetch",
  async ({friendshipid, currentUserid}) => {
    const response = await axios.get(`${BASE_URL}/friends/${friendshipid}/${currentUserid}`)
    return response.data
  }
)

const friendsSlice = createSlice({
    name: "friends",
    initialState: { friends: [], friend: [],loading: false },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchFriends.fulfilled, (state, action) => {
          state.friends = action.payload
        })
        .addCase(fetchFriendDetails.fulfilled, (state, action) => {
          state.friend = action.payload
          state.loading = false
        })
        .addCase(fetchFriendDetails.pending, (state) => {
          state.loading = true
        })
        
        
    },
  });
  

const friendsReducer = friendsSlice.reducer;
export default friendsReducer;