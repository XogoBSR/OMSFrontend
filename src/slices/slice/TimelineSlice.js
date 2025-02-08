import { createSlice } from "@reduxjs/toolkit";


export const TimelineSlice = createSlice({
    name: "Timeline",
    initialState: {
        timelineArr: []
    },
    reducers: {
        createTimelineRequest: () => {},
        updateTimelineRequest: () => {},
        getTimelineRequests: () => {},
        getTimelineRequestsSuccess: (state,action) => {
            if(action.payload.length === 0) {
                state.timelineArr = []
            } else {
                state.timelineArr = action.payload
            }
        },
        getTimelineRequestByDate: () => {

        }
    }
});

export default TimelineSlice;