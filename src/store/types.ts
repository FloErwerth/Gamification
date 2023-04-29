import {AuthenticationPayload} from "./authentication/types";
import {ActivityProps} from "./activities/types";
import {Badge} from "./badges/types";
import {BadgeActionType, BadgesActions} from "./badges/badgesActions";
import {ActiveActivityActionType, ActivityActions} from "./activeActivity/activityActions";
import {ActivitiesActions, ActivitiesActionType} from "./activities/activitiesActions";
import {AuthenticationActions, AuthenticationActionType} from "./authentication/authActions";
import {CalendarActions, CalendarActionType} from "./calendar/calendarActions";
import {RouterActions, RouterActionType} from "./router/routerActions";
import {Pages} from "../types/pages";

export type GamificationModel = {
   activities: ActivityProps[]
   activeActivityIndex: number,
   authentication: AuthenticationPayload,
   badges: Badge[],
   calendar: { daysInMonth: number, currentlySelectedMonth: number }
   router: {
      lastPage: Pages
   }
}


export type GamificationActionTypes =
   BadgeActionType
   | ActivitiesActionType
   | ActiveActivityActionType
   | CalendarActionType
   | AuthenticationActionType
   | RouterActionType


export type GamificationActions =
   BadgesActions
   | ActivityActions
   | ActivitiesActions
   | AuthenticationActions
   | CalendarActions | RouterActions
