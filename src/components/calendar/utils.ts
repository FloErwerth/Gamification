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
   return `${month}, ${split[0]}`
}

export const getDay = (date: DateType) => {
   return date.split("-")[2];
}

export const getAmericanDate = (date: DateType, options: { month?: true, day?: true, year?: true }) => {
   return Temporal.PlainDate.from(date.toString()).toLocaleString("en-US", {
      calendar: 'gregory',
      year: options?.year && "numeric",
      month: options?.month && 'long',
      day: options?.day && 'numeric'
   })
}

export const getWholeDisplayDate = (date: DateType) => {
   return Temporal.PlainDate.from(date).toLocaleString("en-US", {day: "2-digit", month: "short", year: "numeric"});
}

export const generateISOString = (date: string): DateType => {
   const split = date.split(".");
   const year = parseInt(split[2]);
   const month = parseInt(split[1]);
   const day = parseInt(split[0]);
   return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}

