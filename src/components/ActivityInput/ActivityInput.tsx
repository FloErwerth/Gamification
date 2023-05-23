import {TextField} from "@mui/material"
import {TimeField} from "@mui/x-date-pickers";
import {useCallback, useMemo, useState} from "react";
import {Dayjs} from "dayjs";
import {getIsNumberType, isTimeType, toSeconds} from "../../utils/getStringifiedTime";
import {useAppSelector} from "../../store/store";
import {getActiveActivityInfo} from "../../store/activeActivity/activitySelector";
import {z} from "zod";
import {Stat} from "../../activitiesAssembly/stats";

interface IActivityInput {
   label: string;
   onChange: (value: string) => void;
   stat: Stat;
}

export enum ActivityInputTypes {
   NUMBER = "number", SECONDS = "seconds", MINUTES = "minutes", HOURS = "hours", TEXT = "text", MIN_PER_KM = "min/km"
}

const number = z.number();
const numberErrorMessage = "Please only type in numbers.";

export const ActivityInput = ({stat, label, onChange}: IActivityInput) => {
   const activeActivityInfo = useAppSelector(getActiveActivityInfo(stat.name));
   const [error, setError] = useState(false);
   const getFieldProps = useMemo(() => {
      return {
         label,
         error,
         helpText: error ? numberErrorMessage : "",
         format: activeActivityInfo?.type.format,
         InputProps: {endAdornment: <div>{activeActivityInfo?.preferedUnit}</div>},
      }
   }, [error, label, onChange, activeActivityInfo])

   const handleChange = useCallback(function (value: Dayjs | string | null) {
      setError(false);
      if (value) {
         if (typeof value === "string") {
            if (getIsNumberType(activeActivityInfo?.type.input)) {
               if (number.safeParse(parseFloat(value)).success) {
                  onChange(value);
               }
            } else {
               onChange(value);
            }
         } else {
            onChange(toSeconds(value.hour(), value.minute(), value.second(), activeActivityInfo?.type.input).toString());
         }
      } else {
         onChange("");
      }
   }, [activeActivityInfo]);

   return <>{isTimeType(activeActivityInfo?.type.input) ? <TimeField onChange={handleChange} {...getFieldProps} /> :
      <TextField
         onChange={(e) => handleChange(e.target.value)}
         value={stat.value} {...getFieldProps} />}</>
}
