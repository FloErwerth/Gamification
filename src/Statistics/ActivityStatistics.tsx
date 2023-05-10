import {useAppSelector} from "../store/store";
import {getCumulatedData} from "../store/activeActivity/activitySelector";
import {useCallback} from "react";
import {StatEnumType, StatMap} from "../activitiesAssembly/stats";
import {isTimeType, toTimeFormat} from "../utils/getStringifiedTime";

export const ActivityStatistics = () => {
   const cumulatedData = useAppSelector(getCumulatedData);
   const getData = useCallback((name: StatEnumType, data: number) => {
      const type = StatMap(name).type
      if (isTimeType(type)) {
         return toTimeFormat(data, data > 3600);
      }
      return data;
   }, [cumulatedData])
   const getUnit = useCallback((name: StatEnumType, data: number) => {
      const stat = StatMap(name)
      if (isTimeType(stat.type)) {
         return data > 3600 ? "Hours" : "Minutes"
      }
      return stat.preferedUnit;
   }, [cumulatedData])
   return <>
      {cumulatedData?.map(({label, data}) => <div style={{display: "flex", gap: 10, alignItems: "baseline"}}>
         <strong>{label}</strong><i>{getData(label, data)}</i><small>{getUnit(label, data)}</small><br/></div>)}
   </>
}