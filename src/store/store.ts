import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {activitiesReducer} from "./activities/activitiesReducer";
import {authReducer} from "./authentication/authReducer";
import {deleteState, getState, saveState} from "../browserStorage/localStorage";
import {activityReducer} from "./activeActivity/activityReducer";
import {calendarReducer} from "./calendar/calendarReducer";
import {badgeReducer} from "./badges/badgeReducer";
import {middleware} from "./badges/middleware";
import {GamificationActions, GamificationModel} from "./types";
import {routerReducer} from "./router/routerReducer";
import {Pages} from "../types/pages";

const defaultState: GamificationModel = {
   activities: [],
   activeActivityIndex: -1,
   authentication: {email: "", loggedIn: false, userId: "", creationDate: "1900-01-01"},
   calendar: {daysInMonth: -1, currentlySelectedMonth: -1},
   badges: [],
   router: {
      lastPage: Pages.DASHBOARD,
   }
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
      router: routerReducer,
   }),
   middleware: [middleware]
})

store.subscribe(() => {
   if (store.getState().authentication.loggedIn) {
      saveState(store.getState());
   }
   if (!store.getState().authentication.loggedIn) {
      deleteState();
   }
})


export const useAppDispatch: () => typeof store["dispatch"] = useDispatch;
export const useAppSelector: TypedUseSelectorHook<GamificationModel> = useSelector;
