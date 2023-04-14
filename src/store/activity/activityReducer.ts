import {InitialGamificiationState} from "../store"
import {ActivityActions} from "./activityActions"
import {GamificationActionTypes} from "../actions";

export const activityReducer = (oldActivityIndex = InitialGamificiationState.activeActivityIndex, action: ActivityActions) => {
   if (action.type === GamificationActionTypes.SET_ACTIVE_ACTIVITY) {
      return action.payload
   }

   return oldActivityIndex;
}