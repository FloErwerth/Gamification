import {AuthenticationPayload} from "./authentication/types";
import {StatsProps} from "./activities/types";

export enum GamificationActionTypes {
   ADD_ACTIVITY = "gamification/activity/add",
   SET_ACTIVITIES = "gamification/activity/set",
   REGISTER = "gamification/authentication/register",
   LOGIN = "gamification/authentication/login",
   SET_CREATION_DATE = "gamification/authentication/creation_date",
   SET_USER_ID = "gamification/authentication/user_id",
   SET_EMAIL = "gamification/authentication/set_email",
   SET_STAY_LOGGED_IN = "gamification/authentication/set_logged_in",
   SET_ACTIVE_ACTIVITY = "gamification/activities/set_active_activity",
   CHANGE_ACTIVITY = "gamification/change_activity",
   DECREASE_PROGRESS = "gamification/decrease_activity_progress",
   INCREASE_PROGRESS = "gamification/increase_activity_progress",
   UPDATE_ADDITIONAL_CELL_INFO = "gamification/update_activity_calendar_cell",
   UPDATE_ACTIVITY_CELLS = "gamification/update_"
}


export type GamificationModel = {
   activities: StatsProps[]
   activeActivityIndex: number,
   authentication: AuthenticationPayload
}
