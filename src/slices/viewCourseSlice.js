import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLectures: 0,
}

const ViewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload
        },
        setEntireCourseData: (state, action) => {
            state.courseEntireData = action.payload
        },
        setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLectures = action.payload
        },
        setCompletedLectures: (state, action) => {
            state.completedLectures = action.payload
        },
        updateCompletedLectures: (state, action) => {
            state.completedLectures = [...state.completedLectures, action.payload]
        },
    },
})

export const {
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
    setCompletedLectures,
    updateCompletedLectures
} = ViewCourseSlice.actions

export default ViewCourseSlice.reducer