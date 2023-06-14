import {TextField} from "@mui/material"
import {useCallback, useMemo, useState} from "react";
import {Dayjs} from "dayjs";
import {useAppSelector} from "../../store/store";
import {getActiveActivityInfo} from "../../store/activeActivity/activitySelector";
import {Stat} from "../../activitiesAssembly/stats";
import {StatValuePair} from "../../store/activities/types";

interface IActivityInput {
   label: string;
   onChange: (pair?: StatValuePair) => void;
   stat: Stat;
}

export enum ActivityInputTypes {
   NUMBER = "number", SECONDS = "seconds", MINUTES = "minutes", HOURS = "hours", MIN_PER_KM = "min/km"
}

const numberRegex = /^(\d)*[.,]?(\d)*?$/;

export const ActivityInput = ({stat, label, onChange}: IActivityInput) => {
   const activeActivityInfo = useAppSelector(getActiveActivityInfo(stat.statName));
   const [value, setValue] = useState<Dayjs | string>("");
   const [error, setError] = useState(false);

   const getFieldProps = useMemo(() => {
      return {
         label,
         inputProps: {
            maxLength: 12,
         },
         InputProps: {
            endAdornment: <div>{activeActivityInfo?.unit}</div>
         },
      }
   }, [error, label, onChange, activeActivityInfo])

   const handleChange = useCallback(function (value: string) {
      setError(false);
      if (value) {
         setValue(value);
         if (numberRegex.test(value)) {
            const val = value.replace(",", ".")
            onChange({statName: stat.statName, value: parseFloat(val)});
         }
      } else {
         setValue("");
         onChange(undefined)
      }
   }, [activeActivityInfo, onChange]);
   return <TextField
      onChange={(e) => handleChange(e.target.value)}
      value={value} {...getFieldProps} />
}
