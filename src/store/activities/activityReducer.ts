import {Reducer} from "@reduxjs/toolkit";
import {GamificationActionTypes, GamificationModel} from "../types";
import {InitialGamificiationState} from "../store";
import {ActivityActions} from "./acitivityActions";

export const activityReducer: Reducer<GamificationModel, ActivityActions> = (state = {activities: InitialGamificiationState.activities}, action) => {
   let newState: GamificationModel = state;
   switch (action.type) {
      case GamificationActionTypes.ADD_ACTIVITY:
         newState = {
            activities: [...state.activities, {
               currentValue: 0,
               level: 1, ...action.payload
            }]
         }
   }

   return newState;
}