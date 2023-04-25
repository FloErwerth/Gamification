import {z} from "zod";

export const CreativityStat = z.enum(["Pages written", "Pages read", "Pictures drawn"]);
export type CreativityEnumType = z.infer<typeof CreativityStat>;