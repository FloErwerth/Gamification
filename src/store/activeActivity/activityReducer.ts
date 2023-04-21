import {InitialGamificiationState} from "../store"
import {ActiveActivityActionType, ActivityActions} from "./activityActions"

export const activityReducer = (oldActivityIndex = InitialGamificiationState.activeActivityIndex, action: ActivityActions) => {
   if (action.type === ActiveActivityActionType.SET_ACTIVE_ACTIVITY) {
      return action.payload
   }

   return oldActivityIndex;
}