import {useCallback, useState} from "react";

export function useToggle(initialValue: boolean) {
   const [value, setValue] = useState(initialValue);

   const toggleValue = useCallback((nextValue?: boolean) => {
      setValue((currentValue) => !nextValue ? !currentValue : nextValue);
   }, []);

   return {value, toggleValue}
}