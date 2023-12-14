import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/usersSlice";

export default configureStore({
    reducer: {
        users: usersReducer,
    }
})