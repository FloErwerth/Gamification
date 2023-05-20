import {TextField} from "@mui/material"
import {StatEnumType} from "../../activitiesAssembly/stats";
import {TimeField} from "@mui/x-date-pickers";
import {useCallback, useMemo} from "react";
import {Dayjs} from "dayjs";
import {isTimeType, toSeconds} from "../../utils/getStringifiedTime";
import {useAppSelector} from "../../store/store";
import {getActiveActivityInfo} from "../../store/activeActivity/activitySelector";

interface IActivityInput {
   label: string;
   onChange: (value: string) => void;
   stat: StatEnumType;
}

export enum ActivityInputTypes {
   NUMBER = "number", SECONDS = "seconds", MINUTES = "minutes", HOURS = "hours", TEXT = "text", MIN_PER_KM = "min/km"
}


export const ActivityInput = ({stat, label, onChange}: IActivityInput) => {

   const activeActivityInfo = useAppSelector(getActiveActivityInfo(stat));
   const getFieldProps = useMemo(() => {
      return {
         label,
         format: activeActivityInfo?.type.format,
         InputProps: {endAdornment: <div>{activeActivityInfo?.preferedUnit}</div>},
      }
   }, [label, onChange, activeActivityInfo])

   const handleChange = useCallback(function (value: Dayjs | string | null) {
      if (value) {
         if (typeof value === "string") {
            onChange(value);
         } else {
            onChange(toSeconds(value.hour(), value.minute(), value.second(), activeActivityInfo?.type.input).toString());
         }
      }
   }, [activeActivityInfo]);

   return <>{isTimeType(activeActivityInfo?.type.input) ? <TimeField onChange={handleChange} {...getFieldProps} /> :
      <TextField onChange={(e) => handleChange(e.target.value)} {...getFieldProps} />}</>
}
