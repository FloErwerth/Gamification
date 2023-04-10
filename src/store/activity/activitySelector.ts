import {createSelector} from "@reduxjs/toolkit";
import {getActivities} from "../activities/activitiesSelectors";
import {GamificationModel} from "../types";

const getActivityIndex = ({activeActivityIndex}: GamificationModel) => activeActivityIndex
export const getActiveActivity = createSelector([getActivities, getActivityIndex], (activities, index) => {
   return {index, activity: activities[index]};
})