import {StatsProps} from "../components/stats/Stats";
import {Authentication} from "./authentication/types";

export enum GamificationActionTypes {
   ADD_ACTIVITY = "gamification/activity/add",
}


export type GamificationModel = {
   activities: StatsProps[]
   authentication: Authentication
}
