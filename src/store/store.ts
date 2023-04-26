import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {activitiesReducer} from "./activities/activitiesReducer";
import {authReducer} from "./authentication/authReducer";
import {getState, saveState} from "../browserStorage/localStorage";
import {activityReducer} from "./activeActivity/activityReducer";
import {calendarReducer} from "./calendar/calendarReducer";
import {badgeReducer} from "./badges/badgeReducer";
import {badgeMiddleware} from "./badges/badgeMiddleware";
import {GamificationActions, GamificationModel} from "./types";

const defaultState: GamificationModel = {
   activities: [],
   activeActivityIndex: -1,
   authentication: {email: "", loggedIn: false, userId: "", creationDate: " - -"},
   calendar: {daysInMonth: -1, currentlySelectedMonth: -1},
   badges: [],
};

export const InitialGamificiationState: GamificationModel = {...defaultState, ...getState()}

export const store = configureStore<GamificationModel, GamificationActions>({
   preloadedState: InitialGamificiationState,
   reducer: combineReducers({
      activities: activitiesReducer,
      authentication: authReducer,
      activeActivityIndex: activityReducer,
      calendar: calendarReducer,
      badges: badgeReducer,
   }),
   middleware: [badgeMiddleware]
})

store.subscribe(() => {
   if (store.getState().authentication.loggedIn) {
      saveState(store.getState());
   }
})


export const useAppDispatch: () => typeof store["dispatch"] = useDispatch;
export const useAppSelector: TypedUseSelectorHook<GamificationModel> = useSelector;
