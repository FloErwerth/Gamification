import {TextField} from "@mui/material"
import {useCallback, useMemo, useState} from "react";
import {Dayjs} from "dayjs";
import {useAppSelector} from "../../store/store";
import {getActiveActivityInfo} from "../../store/activeActivity/activitySelector";
import {Stat} from "../../activitiesAssembly/stats";
import {getIsNumberType} from "../../utils/getStringifiedTime";
import {StatValuePair} from "../../store/activities/types";

interface IActivityInput {
   label: string;
   onChange: (pair: StatValuePair) => void;
   stat: Stat;
}

export enum ActivityInputTypes {
   NUMBER = "number", SECONDS = "seconds", MINUTES = "minutes", HOURS = "hours", MIN_PER_KM = "min/km"
}


export const ActivityInput = ({stat, label, onChange}: IActivityInput) => {
   const activeActivityInfo = useAppSelector(getActiveActivityInfo(stat.statName));
   const [value, setValue] = useState<Dayjs | string>("");
   const [error, setError] = useState(false);

   const getFieldProps = useMemo(() => {
      return {
         label,
         inputProps: {
            maxLength: getIsNumberType(activeActivityInfo?.type) ? 12 : undefined,
         },
         InputProps: {
            endAdornment: <div>{activeActivityInfo?.unit}</div>
         },
      }
   }, [error, label, onChange, activeActivityInfo])

   const handleChange = useCallback(function (value: string) {
      setError(false);
      if (value) {
         if (getIsNumberType(activeActivityInfo?.type)) {
            const regex = /^(\d)*[.,]?(\d)*?$/;
            if (regex.test(value)) {
               const val = value.replace(",", ".")
               setValue(value);
               onChange({statName: stat.statName, value: parseFloat(val)});
            }
         } else {
            //todo: add hint that only numbers are allowed
            setValue(value);
         }
      } else {
         setValue("");
      }
   }, [activeActivityInfo]);
   return <TextField
      onChange={(e) => handleChange(e.target.value)}
      value={value} {...getFieldProps} />
}
