import {GamificationActionTypes, GamificationModel} from "../types";
import {InitialGamificiationState} from "../store";
import {ActivityActions} from "./acitivityActions";

export const activityReducer = (oldActivities = InitialGamificiationState.activities, action: ActivityActions) => {
   let activities: GamificationModel["activities"] = oldActivities;
   switch (action.type) {
      case GamificationActionTypes.ADD_ACTIVITY:
         activities = [...oldActivities,
            {
               currentValue: 0,
               level: 1, ...action.payload
            }
         ]

   }

   return activities;
}