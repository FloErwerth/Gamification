import {DateType} from "../activities/types";

export type AuthenticationModel = { userId: string, email: string, creationDate: DateType, loggedIn: boolean, stayLoggedIn?: boolean };