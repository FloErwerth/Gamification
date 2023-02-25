import {StatsProps} from "../components/stats/Stats";

export enum GamificationActionTypes {
   ADD_ACTIVITY = "gamification/activity/add",
}


export type GamificationModel = {
   activities: StatsProps[]
}
