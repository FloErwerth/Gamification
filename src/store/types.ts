import {AuthenticationPayload} from "./authentication/types";
import {ActivityProps} from "./activities/types";
import {ActivitiesActionType} from "./activities/activitiesActions";
import {ActiveActivityActionType} from "./activeActivity/activityActions";
import {AuthenticationActionType} from "./authentication/authActions";
import {CalendarActionType} from "./calendar/calendarActions";

export type StoreActions =
   ActivitiesActionType
   | ActiveActivityActionType
   | AuthenticationActionType
   | CalendarActionType;


export type GamificationModel = {
   activities: ActivityProps[]
   activeActivityIndex: number,
   authentication: AuthenticationPayload,
   calendar: { daysInMonth: number, currentlySelectedMonth: number }
}
