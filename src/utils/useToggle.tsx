import {useCallback, useState} from "react";

export function useToggle(initialValue: boolean, toggleCallback?: (value: boolean) => void) {
   const [value, setValue] = useState(initialValue);

   const toggleValue = useCallback((nextValue?: boolean) => {
      toggleCallback?.(value)
      setValue((currentValue) => (!nextValue ? !currentValue : nextValue));
   }, []);

   return {value, toggleValue};
}
