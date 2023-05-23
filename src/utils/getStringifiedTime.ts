import {ActivityInputTypes} from "../components/ActivityInput/ActivityInput";
import {TimeFormat} from "../activitiesAssembly/units";

export const getStringifiedTime = (seconds: number, minutes: number, hours: number) => {
   const hourString = hours >= 0 ? hours < 10 ? `0${hours}` : hours.toString() : "";
   const minuteString = minutes >= 0 ? minutes < 10 ? `0${minutes}` : minutes.toString() : "";
   const secondString = seconds >= 0 ? seconds < 10 ? `0${seconds}` : seconds.toString() : "";

   return {secondString, minuteString, hourString}
}

export const toTimeFormat = (seconds: number, timeFormat?: TimeFormat<ActivityInputTypes>) => {
   const hours = Math.floor(seconds / 3600);
   const minutes = Math.floor((seconds - (hours * 3600)) / 60);
   const remainingSeconds = seconds - (hours * 3600) - (minutes * 60);
   const {secondString, minuteString, hourString} = getStringifiedTime(remainingSeconds, minutes, hours);
   if (timeFormat === "ss") {
      return secondString;
   }
   if (timeFormat === "mm:ss") {
      return `${minuteString}:${secondString}`
   }
   return `${hourString}:${minuteString}:${secondString}`
}

export const toSeconds = (hour: number, minutes: number, seconds: number, type?: ActivityInputTypes) => {
   const hoursSeconds = type && type === ActivityInputTypes.HOURS ? hour * 60 * 60 : 0;
   const minutesSeconds = minutes * 60;
   return hoursSeconds + minutesSeconds + seconds;
}
export const getIsNumberType = (input?: ActivityInputTypes) => {
   return input && input === ActivityInputTypes.NUMBER || input === ActivityInputTypes.SECONDS || input === ActivityInputTypes.MINUTES || input === ActivityInputTypes.HOURS || input === ActivityInputTypes.MIN_PER_KM
};
export const isTimeType = (type?: ActivityInputTypes) => type && type === ActivityInputTypes.SECONDS || type === ActivityInputTypes.MINUTES || type === ActivityInputTypes.HOURS;