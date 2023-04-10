import {InitialGamificiationState} from "../store"
import {GamificationActionTypes} from "../types"
import {ActivityActions} from "./activityActions"

export const activityReducer = (oldActivityIndex = InitialGamificiationState.activeActivityIndex, action: ActivityActions) => {
   if (action.type === GamificationActionTypes.SET_ACTIVE_ACTIVITY) {
      return action.payload
   }

   return oldActivityIndex;
}