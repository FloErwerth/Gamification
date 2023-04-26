import {HTMLInputTypeAttribute, PropsWithChildren, useId, useMemo, useRef, useState,} from "react";
import {cx} from "@emotion/css";
import {getClasses} from "../../utils/styleUtils";
import {inputStyles} from "./inputStyles";
import {PasswordVisibiltyToggler} from "./PasswordVisibilityToggler/PasswordVisibilityToggler";

type InputType = "text" | "number" | "password";

export interface InputProps
   extends PropsWithChildren {
   onChange: (value: string) => void;
   label?: string;
   customWrapperClasses?: string;
   type?: InputType;
   required?: boolean;
   placeholder?: string;
   value?: string;
}

const cssClasses = getClasses(inputStyles);

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
                         type = "text",
                         required = false,
                         placeholder, value,
                      }: InputProps) => {
   const wrapperClasses = useMemo(
      () => cx(cssClasses.inputWrapper, customWrapperClasses, {}),
      [cssClasses.input, customWrapperClasses]
   );
   const [showPW, setShowPW] = useState(false);
   const inputRef = useRef<HTMLInputElement>(null);
   const id = useId();

   return (
      <>
         {label && (
            <label className={cssClasses.label} htmlFor={id}>
               {label}
            </label>
         )}
         <div
            className={cssClasses.wrapper}
            onClick={() => inputRef.current?.focus()}
         >
            <div className={wrapperClasses}>
               <input
                  step={0.01}
                  value={value}
                  placeholder={placeholder ? placeholder : ""}
                  ref={inputRef}
                  onChange={(e) => onChange(e.target.value)}
                  required={required}
                  type={showPW ? "text" : type}
                  className={cssClasses.input}
                  name={id}
                  id={id}
               />
               {type === "password" && (
                  <PasswordVisibiltyToggler setShow={setShowPW} show={showPW}/>
               )}
            </div>
         </div>
      </>
   );
}
