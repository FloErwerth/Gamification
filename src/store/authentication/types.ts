import {DateType} from "../activities/types";

export type AuthenticationPayload = { userId: string, email: string, creationDate: DateType, loggedIn: boolean, stayLoggedIn?: boolean };