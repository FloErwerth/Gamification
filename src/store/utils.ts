import {BadgeActionType} from "./badges/badgesActions";
import {ActivitiesActionType} from "./activities/activitiesActions";
import {ActiveActivityActionType} from "./activeActivity/activityActions";
import {CalendarActionType} from "./calendar/calendarActions";
import {AuthenticationActionType} from "./authentication/authActions";

export function generateAction<P, A extends BadgeActionType | ActivitiesActionType | ActiveActivityActionType | CalendarActionType | AuthenticationActionType>(type: A, payload: P) {
   return {type, payload};
}