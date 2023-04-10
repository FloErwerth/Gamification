import {DateType} from "../../store/activities/types";


export const getDisplayDate = (date: DateType) => {
   return date.split("-").join(".");
}

export const generateISOString = (date: string): DateType => {
   return date.split(".").join("-") as DateType;
}