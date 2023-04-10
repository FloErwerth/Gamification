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

const defaultState = {
   activities: [],
   activeActivityIndex: -1,
   authentication: {email: "", loggedIn: false, userId: "", creationDate: ""}
};

export const InitialGamificiationState: GamificationModel = {...defaultState, ...getState()}

type GamificationActions = ActivitiesActions | ActivityActions | AuthenticationActions;

const reducers = combineReducers({
   activities: activitiesReducer,
   authentication: authReducer,
   activeActivityIndex: activityReducer,
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
