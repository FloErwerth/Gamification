import {KeyboardEvent, useCallback, useEffect, useState} from "react";
import {z} from "zod";

const Keys = z.enum(["ArrowUp", "ArrowDown", "Enter"]).enum;

export function useArrowNavigation<A extends unknown>(array: A[], selectCallback: (index: number) => void) {
   const [selectIndex, setSelectIndex] = useState(0);

   const handleNavigation = useCallback((e: KeyboardEvent) => {
      if (e.key === Keys.ArrowUp) {
         setSelectIndex(selectIndex - 1 < 0 ? array.length - 1 : selectIndex - 1);
      }
      if (e.key === Keys.ArrowDown) {
         setSelectIndex(selectIndex + 1 > array.length - 1 ? 0 : selectIndex + 1);
      }
      if (e.key === Keys.Enter) {
         selectCallback(selectIndex)
      }
   }, [selectIndex, array.length]);

   useEffect(() => {
      setSelectIndex(0)
   }, [array.length])


   return [selectIndex, handleNavigation] as const
}