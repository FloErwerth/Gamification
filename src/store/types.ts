import {AuthenticationPayload} from "./authentication/types";
import {StatsProps} from "../components/activity/types";

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
   DELETE_ACTIVITY = "gamification/delete_activity",
   UPDATE_ACTIVITY_CALENDAR = "gamification/update_activity_calendar",
   ADD_ACTIVITY_CALENDAR = "gamification/add_activity_calendar",
   UPDATE_ACTIVITY_CALENDAR_CELL = "gamification/update_activity_calendar_cell",
   ADD_CALENDAR_ENTRY = "gamification/add_calendar_entry"
}


export type GamificationModel = {
   activities: StatsProps[]
   activity: { index: number },
   authentication: AuthenticationPayload
}
