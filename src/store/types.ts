import {AuthenticationPayload} from "./authentication/types";
import {ActivityProps} from "./activities/types";


export type GamificationModel = {
   activities: ActivityProps[]
   activeActivityIndex: number,
   authentication: AuthenticationPayload
}
