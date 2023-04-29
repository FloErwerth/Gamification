import {HTMLInputTypeAttribute, KeyboardEvent, PropsWithChildren, useId, useMemo, useRef, useState} from "react";
import {cx} from "@emotion/css";
import {getClasses} from "../../utils/styleUtils";
import {inputStyles} from "./inputStyles";
import {TextField} from "@mui/material";
import {PasswordVisibiltyToggler} from "./PasswordVisibilityToggler/PasswordVisibilityToggler";

type InputType = "text" | "number" | "password";

export enum LabelMode { INLINE, TOP }

export interface InputProps
   extends PropsWithChildren {
   onChange: (value: string) => void;
   label?: string;
   labelMode?: LabelMode;
   customWrapperClasses?: string;
   customInputWrapperClasses?: string;
   customInputClasses?: string;
   type?: InputType;
   required?: boolean;
   value?: string;
   onFocus?: () => void;
   onBlur?: () => void;
   onKeyDown?: (e: KeyboardEvent) => void;
}


const getErrorText = (type: HTMLInputTypeAttribute) => {
   if (type === "button") {
      return;
   }

   switch (type) {
      case "email":
         return "Please enter a valid email.";
      case "password":
         return "Please enter your password.";
      default:
         return "";
   }
};

export const Input = ({
                         onChange,
                         label,
                         customWrapperClasses,
                         customInputClasses,
                         type = "text",
                         required = false,
                         labelMode = LabelMode.INLINE,
                         value,
                         onFocus,
                         onBlur,
                         onKeyDown
                      }: InputProps) => {
   const cssClasses = useMemo(() => getClasses(inputStyles(labelMode)), [labelMode]);

   const wrapperClasses = useMemo(
      () => cx(cssClasses.wrapper, customWrapperClasses),
      [cssClasses.wrapper, customWrapperClasses]
   );

   const inputClasses = useMemo(() => cx(cssClasses.input, customInputClasses), [cssClasses.input, customInputClasses]);

   const [showPW, setShowPW] = useState(false);
   const inputRef = useRef<HTMLInputElement>(null);

   const id = useId();

   return (
      <TextField
         onKeyDown={(e) => onKeyDown?.(e)}
         placeholder={" "}
         value={value}
         ref={inputRef}
         onChange={(e) => onChange(e.target.value)}
         required={required}
         type={showPW ? "text" : type}
         name={id}
         id={id}
         InputProps={{
            endAdornment: type === "password" ? <PasswordVisibiltyToggler show={showPW} setShow={setShowPW}/> : null
         }}
         onFocus={onFocus}
         onBlur={onBlur}
         label={label}
      />
   );
}
