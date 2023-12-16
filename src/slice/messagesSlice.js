import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "https://chat-app.leejunsheng7.repl.co"

export const sendMessages = createAsyncThunk(
    "messages/send",
    async (data) => {
        const response = await axios.post(`${BASE_URL}/messages`, data)
        console.log(response.data)
        return response.data
    }
)

export const retrieveMessages = createAsyncThunk(
    "messages/retrieve",
    async (friendshipid) => {
        const response = await axios.get(`${BASE_URL}/messages/${friendshipid}`)
        console.log(response.data)
        return response.data
    }
)

const messagesSlice = createSlice({
    name: "messages",
    initialState: { messages: []},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendMessages.fulfilled, (state, action) => {
                state.messages = [action.payload, ...state.messages]
            })
            .addCase(retrieveMessages.fulfilled, (state, action) => {
                state.messages = action.payload
            })
    }
})

const messagesReducer = messagesSlice.reducer;
export default messagesReducer