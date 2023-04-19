import {DateType} from "../../store/activities/types";

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
   return `${month} ${split[1]}`
}

export const getDay = (date: DateType) => {
   return date.split("-")[0];
}

export const generateISOString = (date: string): DateType => {
   return date.split(".").join("-") as DateType;
}