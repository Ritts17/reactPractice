import { configureStore } from "@reduxjs/toolkit";
import CourseReducer from "./courseSlice";

const store  = configureStore({
    reducer: {
        courses: CourseReducer
    }
})
export default store