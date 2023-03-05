import {StatsProps} from "../components/activity/ActivityWrapper";
import {AuthenticationPayload} from "./authentication/types";

export enum GamificationActionTypes {
   ADD_ACTIVITY = "gamification/activity/add",
   SET_ACTIVITIES = "gamification/activity/set",
   REGISTER ="gamification/register",
   LOGIN ="gamification/login",
   SET_USER_ID ="gamification/set_user_id",
   SET_EMAIL = "gamification/set_email",
   SET_STAY_LOGGED_IN = "gamification/set_stay_logged_in",
   SET_ACTIVE_ACTIVITY = "gamification/set_active_activity",
}


export type GamificationModel = {
   activities: StatsProps[]
   activity: { index: number },
   authentication: AuthenticationPayload
}
