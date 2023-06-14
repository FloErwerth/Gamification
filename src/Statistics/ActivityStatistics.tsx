import {useAppSelector} from "../store/store";
import {getActiveActivityInfos, getCumulatedData} from "../store/activeActivity/activitySelector";
import {useCallback} from "react";
import {StatEnumType} from "../activitiesAssembly/stats";
import {isTimeType, toTimeFormat} from "../utils/getStringifiedTime";

export const ActivityStatistics = () => {
   const cumulatedData = useAppSelector(getCumulatedData);
   const infos = useAppSelector(getActiveActivityInfos);
   const getData = useCallback((name: StatEnumType, data: number) => {
      const info = infos.find((info) => info.statName === name);
      if (info) {
         if (isTimeType(info.type)) {
            return toTimeFormat(data, info.type);
         }
      }
      return data.toFixed(2);
   }, [cumulatedData])
   const getUnit = useCallback((name: StatEnumType, data: number) => {
      const info = infos.find((info) => info.statName === name);
      if (isTimeType(info?.type)) {
         return data > 3600 ? "Hours" : "Minutes"
      }
      return info?.unit;
   }, [cumulatedData])
   return <>
      {cumulatedData?.map(({label, data}) => <div key={`DataFor${label}`}
                                                  style={{display: "flex", gap: 10, alignItems: "baseline"}}>
         <strong>{label}</strong><i>{getData(label, data)}</i><small>{getUnit(label, data)}</small><br/></div>)}
   </>
}