import {ActivityInputTypes} from "../components/ActivityInput/ActivityInput";

const withLeadingZero = (number: string | number) => {
   return number.toString().padStart(2, "0");
}
type TimeFormatOptions = {
   show?: {
      hours?: boolean;
      minutes?: boolean;
      seconds?: boolean;
   },
   leadingZerosHours?: boolean;
}
const concatTime = (timeString: string, toConcat: string, concat?: boolean) => {
   if (concat === undefined || concat) {
      return timeString.concat(":", toConcat);
   } else {
      return timeString;
   }
}
export const toTimeFormat = (seconds: number, timeFormat?: ActivityInputTypes, options?: TimeFormatOptions) => {
   if(timeFormat === "seconds") {
      return withLeadingZero(seconds);
   }
   else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds - (hours * 3600)) / 60);
      const remainingSeconds = Math.floor(seconds - (hours * 3600) - (minutes * 60));
      const hourString = withLeadingZero(hours);
      const minuteString = withLeadingZero(minutes);
      const secondString = withLeadingZero(remainingSeconds.toFixed(0));
      if(timeFormat === "minutes") {
            return concatTime(minuteString, secondString, options?.show?.seconds);
      }
      if(timeFormat === "hours") {
         return concatTime(hourString, concatTime(minuteString, secondString, options?.show?.seconds), options?.show?.minutes);
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
