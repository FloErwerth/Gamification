import {DateType} from "../../store/activities/types";
import {Temporal} from "@js-temporal/polyfill";

export const getDisplayMonth = (month: number) => {
   switch (month) {
      case 1:
         return "January";
      case 2:
         return "February";
      case 3:
         return "March";
      case 4:
         return "April";
      case 5:
         return "May";
      case 6:
         return "June";
      case 7:
         return "July";
      case 8:
         return "August";
      case 9:
         return "September";
      case 10:
         return "October";
      case 11:
         return "November";
      case 12:
         return "December";
   }
}

export const getGeneratedDisplayDate = (date: DateType) => {
   const split = date.split("-");
   const month = getDisplayMonth(parseInt(split[1]));
   return `${month}, ${split[1]}`
}

export const getDay = (date: DateType) => {
   return date.split("-")[0];
}

export const getWholeDisplayDate = (date: DateType) => {
   const temporalDate = Temporal.PlainDate.from(getIsoDateWithLeadingZeros(date));
   return `${getDisplayMonth(temporalDate.month)} ${temporalDate.day}, ${temporalDate.year}`
}

export const getIsoDateWithLeadingZeros = (date: DateType) => {
   const split = date.split("-");
   const year = parseInt(split[2]);
   const month = parseInt(split[1]);
   const day = parseInt(split[0]);
   return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}

export const generateISOString = (date: string): DateType => {
   return date.split(".").join("-") as DateType;
}

