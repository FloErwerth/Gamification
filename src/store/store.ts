import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {GamificationModel} from "./types";
import {activitiesReducer} from "./activities/activitiesReducer";
import {ActivitiesActions} from "./activities/activitiesActions";
import {authReducer} from "./authentication/authReducer";
import {getState, saveState} from "../browserStorage/localStorage";
import {activityReducer} from "./activity/activityReducer";

const defaultState = {
   activities: [],
   activity: {index: -1},
   authentication: {email: "", loggedIn: false, userId: ""}
};
export const InitialGamificiationState: GamificationModel = {...defaultState, ...getState()}
type GamificationActions = ActivitiesActions;

const reducers = combineReducers({
   activities: activitiesReducer,
   authentication: authReducer,
   activity: activityReducer,
})

export const store = configureStore<GamificationModel, GamificationActions>({
   preloadedState: InitialGamificiationState,
   reducer: reducers
})

store.subscribe(() => {
   saveState(store.getState());
})


export const useAppDispatch: () => typeof store["dispatch"] = useDispatch;
export const useAppSelector: TypedUseSelectorHook<GamificationModel> = useSelector;
