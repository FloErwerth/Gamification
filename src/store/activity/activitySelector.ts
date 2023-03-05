import { createSelector } from "@reduxjs/toolkit";
import { getActivities } from "../activities/activitiesSelectors";
import { GamificationModel } from "../types";

const getActivityIndex = ({activity}: GamificationModel) => activity.index
export const getActiveActivity = createSelector([getActivities, getActivityIndex], (activities, index) => {
    return activities[index];
})