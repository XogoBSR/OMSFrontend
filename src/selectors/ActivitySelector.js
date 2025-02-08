import {createSelector} from "@reduxjs/toolkit";

const activitySelector = (state) => state.activity;

const getActivityHistory = () => createSelector(
    activitySelector,
    activity => activity.activityArr
)

export const ActivitySelector = {
    getActivityHistory
}