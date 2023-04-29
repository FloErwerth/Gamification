import {useMemo, useState} from "react";


export function useStringFilter(arrayToFilter: string[]) {
   const [filter, setFilter] = useState("");

   const filteredArray = useMemo(() => {
      if (filter && arrayToFilter.length > 0) {
         return arrayToFilter.filter((element) => element.toLowerCase().includes(filter.toLowerCase()))
      }
      return arrayToFilter;
   }, [filter, arrayToFilter]);

   return {filteredArray, filter, setFilter};
}

export function usePropsFilter<P extends { [key: string]: unknown }[], C extends P[number], R extends { [key: string]: C[keyof C] }>(arrayToFilter: R[], criteria: keyof R) {

   const [filter, setFilter] = useState("");

   const filteredArray = useMemo(() => arrayToFilter.filter((element) => (element[criteria] as string).toLowerCase().includes(filter.toLowerCase())
   ), [filter, criteria, arrayToFilter]);

   return {
      filteredArray,
      filter,
      setFilter
   };
}