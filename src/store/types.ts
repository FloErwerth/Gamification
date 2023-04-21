import {AuthenticationPayload} from "./authentication/types";
import {ActivityProps} from "./activities/types";
import {ActivitiesActionType} from "./activities/activitiesActions";
import {ActiveActivityActionType} from "./activeActivity/activityActions";
import {AuthenticationActionType} from "./authentication/authActions";
import {CalendarActionType} from "./calendar/calendarActions";
import {Badge} from "./badges/types";
import {BadgeActionType} from "./badges/badgesActions";

export type StoreActions =
   ActivitiesActionType
   | ActiveActivityActionType
   | AuthenticationActionType
   | CalendarActionType | BadgeActionType;


export type GamificationModel = {
   activities: ActivityProps[]
   activeActivityIndex: number,
   authentication: AuthenticationPayload,
   badges: Badge[],
   calendar: { daysInMonth: number, currentlySelectedMonth: number }
}
