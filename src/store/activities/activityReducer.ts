import {GamificationActionTypes, GamificationModel} from "../types";
import {InitialGamificiationState} from "../store";
import {ActivityActions} from "./acitivityActions";

export const activityReducer = (oldActivities = InitialGamificiationState.activities, action: ActivityActions) => {
   let activities: GamificationModel["activities"] = oldActivities;

   if(action.type === GamificationActionTypes.ADD_ACTIVITY) {
      return [...oldActivities, action.payload]
   }
   if(action.type === GamificationActionTypes.SET_ACTIVITIES) {
      return activities = action.payload
   }

   return activities;
}