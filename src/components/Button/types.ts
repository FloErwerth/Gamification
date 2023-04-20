import {z} from "zod";

const ButtonTheme = z.enum(["CTA", "DEFAULT", "SELECTED"]);
export const ButtonThemeEnum = ButtonTheme.Enum;
export type ButtonThemeType = z.infer<typeof ButtonTheme>;