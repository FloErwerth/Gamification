import {ActivityInputTypes} from "../components/ActivityInput/ActivityInput";

export const getStringifiedTime = (minutes: number, seconds: number, hours?: number) => {
   const hourString = hours && hours >= 0 ? hours < 10 ? `0${hours}` : hours.toString() : undefined;
   const minuteString = minutes >= 0 ? minutes < 10 ? `0${minutes}` : minutes.toString() : undefined;
   const secondString = seconds >= 0 ? seconds < 10 ? `0${seconds}` : seconds.toString() : undefined;

   return `${hourString !== undefined ? hourString.concat(":") : ""}${minuteString !== undefined ? minuteString.concat(":") : ""}${secondString !== undefined ? secondString : ""}`
}

export const toTimeFormat = (seconds?: number, isHourFormat?: boolean) => {
   if (seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds - (hours * 3600)) / 60);
      const remainingSeconds = seconds - (hours * 3600) - (minutes * 60);
      return getStringifiedTime(minutes, remainingSeconds, isHourFormat ? hours : undefined);
   }
   return "";
}

export const toSeconds = (hour: number, minutes: number, seconds: number, type?: ActivityInputTypes) => {
   const hoursSeconds = type && type === ActivityInputTypes.HOURS ? hour * 60 * 60 : 0;
   const minutesSeconds = minutes * 60;
   return hoursSeconds + minutesSeconds + seconds;
}

export const isTimeType = (type?: ActivityInputTypes) => type && type === ActivityInputTypes.MINUTES || type === ActivityInputTypes.HOURS;