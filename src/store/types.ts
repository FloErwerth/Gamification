import {AuthenticationPayload} from "./authentication/types";
import {StatsProps} from "./activities/types";


export type GamificationModel = {
   activities: StatsProps[]
   activeActivityIndex: number,
   authentication: AuthenticationPayload
}
