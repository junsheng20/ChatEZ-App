import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/usersSlice";
import friendsReducer from "./slice/friendsSlice";

export default configureStore({
    reducer: {
        users: usersReducer,
        friends: friendsReducer,
    }
})