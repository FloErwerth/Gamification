import {z} from "zod";

export type Authentication = { email: string, loggedIn: boolean };
export const AUTHENTICATION_ACTION_TYPE = z.enum(["REGISTER", "LOGIN", "SET_EMAIL"])
export type AUTHENTICATION_ACTION_TYPES = z.infer<typeof AUTHENTICATION_ACTION_TYPE>