import {GamificationActions} from "./store";
import {Dispatch, MiddlewareAPI} from "@reduxjs/toolkit";
import {GamificationModel} from "./types";
import {GamificationActionTypes} from "./actions";
import {updateActivitiesInDatabase} from "../../firebase";

let lastAction: GamificationActionTypes | undefined = undefined;
export const middleware = (api: MiddlewareAPI<Dispatch<GamificationActions>, GamificationModel>) => (next: Dispatch<GamificationActions>) => (action: GamificationActions) => {
   next(action);
   if (lastAction) {
      if (lastAction === GamificationActionTypes.ADD_ACTIVITY) {
         console.log(api.getState().activities);
         updateActivitiesInDatabase(api.getState().authentication.userId, api.getState().activities).then();
      }
   }


   lastAction = action.type;
}