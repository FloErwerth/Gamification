import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {GamificationModel} from "./types";
import {activityReducer} from "./activities/activityReducer";
import {ActivityActions} from "./activities/acitivityActions";
import {ACTIVITY_INCREASE_TYPES, ACTIVITY_TYPE} from "./activities/types";
import {authReducer} from "./authentication/authReducer";
import { getStoredActivities } from "../../firebase";

export const InitialGamificiationState: GamificationModel = {
   activities: [],
   authentication: {email: "", loggedIn: false, userId: ""}
};

type GamificationActions = ActivityActions;

const reducers = combineReducers({activities: activityReducer, authentication: authReducer})

export const store = configureStore<GamificationModel, GamificationActions>({
   preloadedState: InitialGamificiationState,
   reducer: reducers
})


export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<GamificationModel> = useSelector;
