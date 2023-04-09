import {AuthenticationPayload} from "./authentication/types";
import {StatsProps} from "./activities/types";

export enum GamificationActionTypes {
   ADD_ACTIVITY = "gamification/activity/add",
   SET_ACTIVITIES = "gamification/activity/set",
   REGISTER = "gamification/register",
   LOGIN = "gamification/login",
   SET_CREATION_DATE = "gamification/set_creation_date",
   SET_USER_ID = "gamification/set_user_id",
   SET_EMAIL = "gamification/set_email",
   SET_STAY_LOGGED_IN = "gamification/set_stay_logged_in",
   SET_ACTIVE_ACTIVITY = "gamification/set_active_activity",
   CHANGE_ACTIVITY = "gamification/change_activity",
   DECREASE_PROGRESS = "gamification/decrease_activity_progress",
   INCREASE_PROGRESS = "gamification/increase_activity_progress",
}


export type GamificationModel = {
   activities: StatsProps[]
   activity: { index: number },
   authentication: AuthenticationPayload
}
