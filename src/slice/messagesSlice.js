import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "https://chat-app.leejunsheng7.repl.co"

export const sendMessages = createAsyncThunk(
    "messages/send",
    async (data) => {
        const response = await axios.post(`${BASE_URL}/messages`, data)
        return response.data
    }
)

export const retrieveMessages = createAsyncThunk(
    "messages/retrieve",
    async ({friendshipid, currentUserid}) => {
        const response = await axios.get(`${BASE_URL}/messages/${friendshipid}/${currentUserid}`)
        return response.data
    }
)

export const deleteMessages = createAsyncThunk(
    "message/delete",
    async (messageid) => {
        const response = await axios.delete(`${BASE_URL}/messages/${messageid}`)
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
            .addCase(deleteMessages.fulfilled, (state, action) => {
                state.messages = state.messages.filter((message) => message.messageid !== action.payload.messageid)
            })
    }
})

const messagesReducer = messagesSlice.reducer;
export default messagesReducer