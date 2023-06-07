import {TextField} from "@mui/material"
import {useCallback, useMemo, useState} from "react";
import {Dayjs} from "dayjs";
import {useAppSelector} from "../../store/store";
import {getActiveActivityInfo} from "../../store/activeActivity/activitySelector";
import {Stat} from "../../activitiesAssembly/stats";
import {getIsNumberType} from "../../utils/getStringifiedTime";

interface IActivityInput {
   label: string;
   onChange: (value: string) => void;
   stat: Stat;
}

export enum ActivityInputTypes {
   NUMBER = "number", SECONDS = "seconds", MINUTES = "minutes", HOURS = "hours", MIN_PER_KM = "min/km"
}


export const ActivityInput = ({stat, label, onChange}: IActivityInput) => {
   const activeActivityInfo = useAppSelector(getActiveActivityInfo(stat.name));
   const [value, setValue] = useState<Dayjs | string>("");
   const [error, setError] = useState(false);

   const getFieldProps = useMemo(() => {
      return {
         label,
         inputProps: {
            maxLength: getIsNumberType(activeActivityInfo?.type.input) ? 12 : undefined,
         },
         InputProps: {
            endAdornment: <div>{activeActivityInfo?.preferedUnit}</div>
         },
      }
   }, [error, label, onChange, activeActivityInfo])

   const handleChange = useCallback(function (value: string) {
      setError(false);
      if (value) {
         if (getIsNumberType(activeActivityInfo?.type.input)) {
            const regex = /^(\d)*[.,]?(\d)*?$/;
            if (regex.test(value)) {
               const val = value.replace(",", ".")
               setValue(value);
               onChange(val);
            }
         } else {
            setValue(value);
            onChange(value);
         }

      } else {
         setValue("");
         onChange("");
      }
   }, [activeActivityInfo]);
   return <TextField
      onChange={(e) => handleChange(e.target.value)}
      value={value} {...getFieldProps} />
}
