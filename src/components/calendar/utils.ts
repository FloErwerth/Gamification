import {DateType} from "../../store/activities/types";

export const generateISOString = (date: string): DateType => {
   return date.split(".").join("-") as DateType;
}