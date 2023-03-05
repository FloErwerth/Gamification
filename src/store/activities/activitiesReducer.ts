import {GamificationActionTypes, GamificationModel} from "../types";
import {InitialGamificiationState} from "../store";
import {ActivitiesActions} from "./activitiesActions";

export const activitiesReducer = (oldActivities = InitialGamificiationState.activities, action: ActivitiesActions) => {
   let activities = oldActivities;

   if(action.type === GamificationActionTypes.ADD_ACTIVITY) {
      return [...oldActivities, action.payload]
   }
   if(action.type === GamificationActionTypes.SET_ACTIVITIES) {
      return activities = action.payload
   }

   return activities;
}