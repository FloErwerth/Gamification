import {AuthenticationPayload} from "./authentication/types";
import {ActivityProps} from "./activities/types";
import {Badge} from "./badges/types";
import {BadgesActions} from "./badges/badgesActions";
import {ActivityActions} from "./activeActivity/activityActions";
import {ActivitiesActions} from "./activities/activitiesActions";
import {AuthenticationActions} from "./authentication/authActions";
import {CalendarActions} from "./calendar/calendarActions";

export type GamificationModel = {
   activities: ActivityProps[]
   activeActivityIndex: number,
   authentication: AuthenticationPayload,
   badges: Badge[],
   calendar: { daysInMonth: number, currentlySelectedMonth: number }
}

export type GamificationActions =
   BadgesActions
   | ActivityActions
   | ActivitiesActions
   | AuthenticationActions
   | CalendarActions
