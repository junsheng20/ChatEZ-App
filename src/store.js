import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/usersSlice";
import friendsReducer from "./slice/friendsSlice";
import messagesReducer from "./slice/messagesSlice";

export default configureStore({
    reducer: {
        users: usersReducer,
        friends: friendsReducer,
        messages: messagesReducer,
    }
})