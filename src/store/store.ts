import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {GamificationModel} from "./types";
import {activitiesReducer} from "./activities/activitiesReducer";
import {ActivitiesActions} from "./activities/activitiesActions";
import {authReducer} from "./authentication/authReducer";
import {getState, saveState} from "../browserStorage/localStorage";
import {activityReducer} from "./activity/activityReducer";
import {ActivityActions} from "./activity/activityActions";
import {AuthenticationActions} from "./authentication/authActions";
import {calendarReducer} from "./calendar/calendarReducer";

const defaultState: GamificationModel = {
   activities: [],
   activeActivityIndex: -1,
   authentication: {email: "", loggedIn: false, userId: "", creationDate: " - -"},
   calendar: {daysInMonth: -1, currentlySelectedMonth: -1},
};

export const InitialGamificiationState: GamificationModel = {...defaultState, ...getState()}

export type GamificationActions = ActivitiesActions | ActivityActions | AuthenticationActions;

export const store = configureStore<GamificationModel, GamificationActions>({
   preloadedState: InitialGamificiationState,
   reducer: combineReducers({
      activities: activitiesReducer,
      authentication: authReducer,
      activeActivityIndex: activityReducer,
      calendar: calendarReducer,
   }),
})

store.subscribe(() => {
   if (store.getState().authentication.loggedIn) {
      saveState(store.getState());
   }
})


export const useAppDispatch: () => typeof store["dispatch"] = useDispatch;
export const useAppSelector: TypedUseSelectorHook<GamificationModel> = useSelector;
