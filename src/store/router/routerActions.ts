import {generateAction} from "../utils";
import {Pages} from "../../types/pages";

export enum RouterActionType {
   SET_LAST_PAGE = "gamification/router/set_last_page",
}

export type RouterActions = { type: RouterActionType.SET_LAST_PAGE, payload: Pages }

export const setLastPage = (payload: string) => generateAction(RouterActionType.SET_LAST_PAGE, payload);