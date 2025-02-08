import { createSlice } from "@reduxjs/toolkit";


export const ActivitySlice = createSlice({
    name: "Activity",
    initialState: {
        activityArr: [],

    },
    reducers: {
        createTodayGoal: () => { 
        },
        createTodayStatus: () => {
        },
        getUserActivitySuccessfull: (state,action) => {
            
            if(action.payload.length === 0) {
                state.activityArr = []
                console.log("1 REDUCER ACTIVITY LOG ",action.payload)
            }else {
                state.activityArr = action.payload
                console.log("2 REDUCER ACTIVITY LOG ",action.payload)
            }

        },
        getUserActivity: () => {
        },
        checkOutStatusUpdate: () => {},
        breakStartRed: () => {},
        breakEndRed: () => {},
        lateCheckIn: () => {},
        earlyCheckOut: () => {},
        idelStartRed: () => {},
        idelEndRed: () => {},
        productivityStatusRed: () => {},
        overLimitBreakRed: () => {},
        eraseActivity: (state = []) => {
            state.activityArr = []
        },
        createTimelineRequest: () => {},
        updateTimelineRequest: () => {},
        getTimelineRequests: () => {}
    }
});

export default ActivitySlice;