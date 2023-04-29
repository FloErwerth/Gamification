import {TextField} from "@mui/material"
import {StatEnumType, StatMap} from "../../activitiesAssembly/stats";
import {TimeField} from "@mui/x-date-pickers";
import {useCallback, useMemo} from "react";
import {Dayjs} from "dayjs";
import {isTimeType, toSeconds} from "../../utils/getStringifiedTime";

interface IActivityInput {
   label: string;
   onChange: (value: string) => void;
   stat: StatEnumType;
}

export enum ActivityInputTypes {
   NUMBER = "number", MINUTES = "minutes", HOURS = "hours", TEXT = "text", MIN_PER_KM = "min/km"
}


export const ActivityInput = ({stat, label, onChange}: IActivityInput) => {
   const {preferedUnit, type} = StatMap(stat);
   const getFormat = useMemo(() => type === ActivityInputTypes.HOURS ? "hh:mm:ss" : "mm:ss", []);
   const getFieldProps = useMemo(() => {
      const format = isTimeType(type) ? getFormat : undefined;
      return {
         label,
         format,
         InputProps: {endAdornment: <div>{preferedUnit}</div>},
      }
   }, [label, onChange, type, preferedUnit])

   const handleChange = useCallback(function (value: Dayjs | string | null) {
      if (value) {
         if (typeof value === "string") {
            onChange(value);
         } else {
            onChange(toSeconds(value.hour(), value.minute(), value.second(), type).toString());
         }
      }
   }, [type]);

   return <>{isTimeType(type) ? <TimeField onChange={handleChange} {...getFieldProps} /> :
      <TextField onChange={(e) => handleChange(e.target.value)} {...getFieldProps} />}</>
}
