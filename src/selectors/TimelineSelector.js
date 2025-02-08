import {createSelector} from "@reduxjs/toolkit";

const timelineSelector = (state) => state.timeline;

const getTimelineRequests = () => createSelector(
    timelineSelector,
    timeline => timeline.timelineArr
);

export const TimelineSelector = {
    getTimelineRequests
}