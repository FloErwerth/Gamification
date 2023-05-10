import {ChartData} from "../../../store/activeActivity/activitySelector";
import {useEffect, useState} from "react";

export const useMinMaxSingle = (data?: ChartData["datasets"][number]["data"], stepCount: number = 6) => {
   const [minMax, setMinMax] = useState<{ min: number, max: number }>();

   if (!data) {
      return {min: undefined, max: undefined}
   }

   useEffect(() => {
      let min = Infinity;
      let max = 0;
      data.forEach((value) => {
         min = value < min ? value : min;
         max = value > max ? value : max;
      });
      const step = (max - min) / stepCount;
      const maybeMin = min - step;
      min = maybeMin < 0 ? 0 : maybeMin;
      setMinMax({min, max: max + step});
   }, [data]);

   return {min: minMax?.min, max: minMax?.max}
}

export const useMinMax = (datasets?: ChartData["datasets"], stepCount: number = 6) => {
   const [minMax, setMinMax] = useState<{ min: number, max: number }>();

   if (!datasets) {
      return {min: undefined, max: undefined}
   }

   useEffect(() => {
      let min = Infinity;
      let max = 0;
      datasets.forEach((dataset) => dataset.data.forEach((value) => {
         min = value < min ? value : min;
         max = value > max ? value : max;
      }));
      const step = (max - min) / stepCount;
      const maybeMin = min - step;
      min = maybeMin < 0 ? 0 : maybeMin;
      setMinMax({min, max: max + step});
   }, [datasets]);

   return {min: minMax?.min, max: minMax?.max}
}