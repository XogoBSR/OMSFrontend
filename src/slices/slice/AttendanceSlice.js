import { createSlice } from "@reduxjs/toolkit";

export const AttendanceSlice = createSlice({
    name: "Attendance",
    initialState: {
        attendances: [],
        pagination: {},
        attendance: {},
    },
    reducers: {
        getAttendances: () => { 
        },
        getAttendancesSuccess: (state, action) => {
           
            state.attendance = {};
            state.attendances = action.payload.data;
            state.pagination = action.payload.pagination;
            console.log("state Attendaces ",  state.pagination)
        },
        getAttendanceById: () => {},
        getAttendanceByIdSuccess: (state, action) => {
            state.attendance = action.payload
        },
        createAttendance: () => {},
        updateAttendance: () => {},
        deleteAttendance: () => {},
        createLunchBreak: () => {},
        updateLunchBreak: () => {},
        getAttendancesByMonth: () => {}
    }
});

export default AttendanceSlice;