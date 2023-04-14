import {z} from "zod";

const AuthenticationMode = z.enum(["LOGIN", "REGISTER"]);
export type AuthenticationMode = z.infer<typeof AuthenticationMode>;
export const AuthenticationModeEnum = AuthenticationMode.enum;