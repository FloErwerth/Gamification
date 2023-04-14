import {z} from "zod";

const ButtonTheme = z.enum(["CTA", "DEFAULT"]);
export const ButtonThemeEnum = ButtonTheme.Enum;
export type ButtonThemeType = z.infer<typeof ButtonTheme>;