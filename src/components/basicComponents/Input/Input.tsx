import {HTMLInputTypeAttribute, PropsWithChildren, useId, useMemo, useRef, useState} from "react";
import {cx} from "@emotion/css";
import {getClasses} from "../../../utils/styleUtils";
import {inputStyles} from "./inputStyles";
import {PasswordVisibiltyToggler} from "./PasswordVisibilityToggler/PasswordVisibilityToggler";
import {SafeParseReturnType} from "zod";

type InputValues = string | number | string[] | undefined

export interface InputProps extends PropsWithChildren {
   onChange: (value: string) => void;
   value: InputValues;
   label?: string;
   customWrapperClasses?: string;
   type?: HTMLInputTypeAttribute;
   required?: boolean;
   validationResult?: SafeParseReturnType<InputValues, InputValues>;
   placeholder?: string;
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
}

export const Input = ({
                         onChange,
                         value,
                         label,
                         customWrapperClasses,
                         type = "text",
                         required = false,
                         validationResult,
                         placeholder,
                      }: InputProps) => {
   const wrapperClasses = useMemo(() => cx(cssClasses.inputWrapper, customWrapperClasses, {[cssClasses.error]: validationResult && !validationResult.success}), [cssClasses.input, customWrapperClasses, validationResult]);
   const [showPW, setShowPW] = useState(false);
   const inputRef = useRef<HTMLInputElement>(null);
   const id = useId();

   return <>
      {label && <label className={cssClasses.label} htmlFor={id}>{label}</label>}
      <div className={cssClasses.wrapper} onClick={() => inputRef.current?.focus()}>
         <div className={wrapperClasses}>
            <input placeholder={placeholder ? placeholder : ""} ref={inputRef}
                   onChange={(e) => onChange(e.target.value)} value={value} required={required}
                   type={showPW ? "text" : type} className={cssClasses.input} name={id} id={id}/>
            {type === "password" && value && <PasswordVisibiltyToggler setShow={setShowPW} show={showPW}/>}
         </div>
         {validationResult && !validationResult.success &&
             <div
                 className={cssClasses.errorMessage}>{(validationResult && validationResult.error.errors.map((error) => error.message).join("\n")) ?? getErrorText(type)}</div>}
      </div>
   </>
}