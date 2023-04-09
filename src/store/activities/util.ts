import {StatsProps} from "./types";

export const getInitialMaxValue = (increasementType: StatsProps["increasement"]): number => {
   return increasementType === "Quadratic" ? 2 : 1
}