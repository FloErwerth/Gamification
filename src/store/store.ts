import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {GamificationModel} from "./types";
import {activityReducer} from "./activities/activityReducer";
import {ActivityActions} from "./activities/acitivityActions";
import {ACTIVITY_INCREASE_TYPES, ACTIVITY_TYPE} from "./activities/types";
import {authReducer} from "./authentication/authReducer";

export const InitialGamificiationState: GamificationModel = {
   activities: [{
      currentValue: 0,
      level: 1,
      maxValue: 15,
      name: "Hiking",
      type: ACTIVITY_TYPE.Enum.Hours,
      increasement: ACTIVITY_INCREASE_TYPES.Enum.Linear
   }],
   authentication: {username: "", loggedIn: false}
};

type GamificationActions = ActivityActions;

const reducers = combineReducers({activities: activityReducer, authentication: authReducer})

export const store = configureStore<GamificationModel, GamificationActions>({
   preloadedState: InitialGamificiationState,
   reducer: reducers
})


export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<GamificationModel> = useSelector;
