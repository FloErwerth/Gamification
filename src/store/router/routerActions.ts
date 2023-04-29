import {generateAction} from "../utils";

export enum RouterActionType {
   SET_LAST_PAGE = "gamification/router/set_last_page",
}

export type RouterActions = { type: RouterActionType.SET_LAST_PAGE, payload: string }

export const setLastPage = (payload: string) => generateAction(RouterActionType.SET_LAST_PAGE, payload);