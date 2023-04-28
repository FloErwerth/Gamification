import {HTMLInputTypeAttribute, PropsWithChildren, useId, useMemo, useRef, useState,} from "react";
import {cx} from "@emotion/css";
import {getClasses} from "../../utils/styleUtils";
import {inputStyles} from "./inputStyles";
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
                         customInputWrapperClasses, customInputClasses,
                         type = "text",
                         required = false,
                         labelMode = LabelMode.INLINE,
                      }: InputProps) => {
   const cssClasses = useMemo(() => getClasses(inputStyles(labelMode)), [labelMode]);

   const wrapperClasses = useMemo(
      () => cx(cssClasses.wrapper, customInputWrapperClasses),
      [cssClasses.wrapper, customWrapperClasses]
   );

   const inputClasses = useMemo(() => cx(cssClasses.input, customInputClasses), [cssClasses.input, customInputClasses]);

   const [showPW, setShowPW] = useState(false);
   const inputRef = useRef<HTMLInputElement>(null);

   const id = useId();

   return (
      <div className={wrapperClasses}>
         <input
            placeholder={" "}
            step={0.01}
            ref={inputRef}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            type={showPW ? "text" : type}
            className={inputClasses}
            name={id}
            id={id}
         />
         {label && (
            <label className={cssClasses.label} htmlFor={id}>
               {label}
            </label>
         )}
         {type === "password" && (
            <PasswordVisibiltyToggler setShow={setShowPW} show={showPW}/>
         )}
      </div>
   );
}
