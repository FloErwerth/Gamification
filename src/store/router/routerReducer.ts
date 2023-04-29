import {GamificationModel} from "../types";
import {RouterActions, RouterActionType} from "./routerActions";
import {InitialGamificiationState} from "../store";

export const routerReducer = (state: GamificationModel["router"] = InitialGamificiationState.router, action: RouterActions) => {
   if (action.type === RouterActionType.SET_LAST_PAGE) {
      return {lastPage: action.payload}
   }
   return state;
}

