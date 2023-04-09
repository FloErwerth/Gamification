import {InitialGamificiationState} from "../store"
import {GamificationActionTypes} from "../types"
import {ActivityActions} from "./activityActions"

export const activityReducer = (oldActivity = InitialGamificiationState.activity, action: ActivityActions) => {

   let activity = oldActivity;

   if (action.type === GamificationActionTypes.SET_ACTIVE_ACTIVITY) {
      return {index: action.payload};
   }

   return activity;
}