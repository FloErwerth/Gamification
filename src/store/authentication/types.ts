import {z} from "zod";

export type AuthenticationPayload = { userId: string, email: string, loggedIn: boolean };