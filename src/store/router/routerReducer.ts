import {GamificationModel} from "../types";
import {RouterActions, RouterActionType} from "./routerActions";
import {Pages} from "../../types/pages";

export const routerReducer = (state: GamificationModel["router"] = {lastPage: Pages.OVERVIEW}, action: RouterActions) => {
   if (action.type === RouterActionType.SET_LAST_PAGE) {
      return {lastPage: action.payload}
   }
   return state;
}

