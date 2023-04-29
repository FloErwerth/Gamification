import {Input, InputProps} from "../Input";
import {getClasses} from "../../../utils/styleUtils";
import {styles} from "./styles";
import {Close} from "../../../media/icons";
import {useMemo} from "react";
import {cx} from "@emotion/css";

export const InputWithDelete = ({
                                   onChange,
                                   label,
                                   labelMode,
                                   value,
                                   onBlur,
                                   customWrapperClasses,
                                   customInputWrapperClasses,
                                   customInputClasses,
                                   type,
                                   required,
                                   onFocus,
                                   children, onKeyDown
                                }: InputProps) => {
   const cssClasses = useMemo(() => getClasses(styles), [labelMode]);
   const inputClasses = useMemo(() => cx(customInputClasses, cssClasses.noOutline), [customInputClasses])
   return <div onBlur={onBlur} className={cssClasses.inputWithDeleteWrapper}>
      <Input onKeyDown={onKeyDown} onChange={onChange} labelMode={labelMode} label={label} value={value}
             onFocus={onFocus}
             customWrapperClasses={customWrapperClasses} customInputClasses={inputClasses}
             customInputWrapperClasses={customInputWrapperClasses} type={type}
             required={required}>{children}</Input>
      {value && <>
          <button className={cssClasses.delete} onClick={() => onChange("")}><Close
              className={cssClasses.icon}/>
          </button>
      </>}
   </div>
}