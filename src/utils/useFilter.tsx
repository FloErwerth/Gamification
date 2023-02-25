import {ReactElement, useMemo, useState} from "react";
import {css} from "@emotion/css";

export type FilterType = {
   name: string;
}


export function useFilter<P extends { name: string }>(arrayToFilter: ReactElement<P>[]) {

   const [filter, setFilter] = useState("");
   const hideStyle = useMemo(() => css({display: "none"}), []);

   const filteredArray = useMemo(() => arrayToFilter.map((element) => element.props.name.toLowerCase().includes(filter.toLowerCase()) ?
      element : <div className={hideStyle}>{element}</div>), [filter, arrayToFilter])

   return {filteredArray, filter, setFilter};
}