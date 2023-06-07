import {ActivityInputTypes} from "../components/ActivityInput/ActivityInput";

const withLeadingZero = (number: string | number) => {
   return number.toString().padStart(2, "0");
}
type TimeFormatOptions = {
   show: {
      hours?: boolean;
      minutes?: boolean;
      seconds?: boolean;
   }
}
const concatTime = (timeString: string, toConcat: string, concat?: boolean) => {
   if (concat === undefined || concat) {
      return timeString.concat(":", toConcat);
   } else {
      return timeString;
   }
}
export const toTimeFormat = (seconds: number, timeFormat?: ActivityInputTypes, options?: TimeFormatOptions) => {
   switch (timeFormat) {
      case "seconds": {
         return withLeadingZero(seconds);
      }
      case "minutes": {
         const minutes = seconds / 60;
         const remainingSeconds = seconds - (minutes * 60);
         const minutesString = withLeadingZero(minutes);
         const secondString = withLeadingZero(remainingSeconds.toFixed(0));
         if (remainingSeconds > 0) {
            return concatTime(minutesString, secondString, options?.show.seconds);
         } else {
            return minutesString;
         }
      }
      case "hours": {
         const hours = Math.floor(seconds / 3600);
         const minutes = Math.floor((seconds - (hours * 3600)) / 60);
         const remainingSeconds = seconds - (hours * 3600) - (minutes * 60);
         const hourString = hours.toString();
         const minuteString = withLeadingZero(minutes);
         const secondString = withLeadingZero(remainingSeconds.toFixed(0));
         if (minutes === 0 && remainingSeconds === 0) {
            return hourString;
         }
         if (minutes > 0 && remainingSeconds === 0) {
            if (!options?.show.minutes) {
               return hourString;
            }
            return concatTime(hourString, minuteString, options?.show.minutes);
         }
         return concatTime(hourString, concatTime(minuteString, secondString, options?.show.seconds), options?.show.minutes);
      }
   }
}

export const toSeconds = (value?: number, type?: ActivityInputTypes) => {
   if (value) {
      switch (type) {
         case "seconds":
            return value;
         case "minutes":
            return value * 60;
         case "hours":
            return value * 60 * 60;
         default:
            return value;
      }
   }
   return value;
}

export const getIsNumberType = (input?: ActivityInputTypes) => {
   return input && input === ActivityInputTypes.NUMBER || input === ActivityInputTypes.SECONDS || input === ActivityInputTypes.MINUTES || input === ActivityInputTypes.HOURS || input === ActivityInputTypes.MIN_PER_KM
};
export const isTimeType = (type?: ActivityInputTypes) => type && type === ActivityInputTypes.SECONDS || type === ActivityInputTypes.MINUTES || type === ActivityInputTypes.HOURS;
