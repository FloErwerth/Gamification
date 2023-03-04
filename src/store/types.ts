import {StatsProps} from "../components/stats/Stats";
import {AuthenticationPayload} from "./authentication/types";

export enum GamificationActionTypes {
   ADD_ACTIVITY = "gamification/activity/add",
   SET_ACTIVITIES = "gamification/activity/set",
   REGISTER ="gamification/register",
   LOGIN ="gamification/login",
   SET_USER_ID ="gamification/set_user_id",
   SET_EMAIL = "gamification/set_email",
}


export type GamificationModel = {
   activities: StatsProps[]
   authentication: AuthenticationPayload
}
