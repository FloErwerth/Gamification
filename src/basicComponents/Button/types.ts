import {z} from "zod";

const ButtonTheme = z.enum(["outlined", "contained"]);
export const ButtonThemeEnum = ButtonTheme.Enum;
export type ButtonThemeType = z.infer<typeof ButtonTheme>;