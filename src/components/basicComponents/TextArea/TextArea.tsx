import React, {useCallback, useId, useRef, useState} from "react";
import {getClasses} from "../../../utils/styleUtils";
import {styles} from "./styles";
import {useEffectOnce} from "usehooks-ts";

interface TextAreaProps {
   label: string;
   onChange?: (value: string) => void;
   initialValue?: string;
}

const cssClasses = getClasses(styles)
export const TextArea = ({onChange, label, initialValue = ""}: TextAreaProps) => {
   const [value, setValue] = useState(initialValue);
   const id = useId();
   const textAreaRef = useRef<HTMLTextAreaElement>(null);

   useEffectOnce(() => {
      if (textAreaRef && textAreaRef.current) {
         textAreaRef.current.style.height = "20px";
         textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight - 20}px`;
      }
   })

   const handleOnChange = useCallback(() => {
      if (textAreaRef && textAreaRef.current) {
         const value = textAreaRef.current.value;
         textAreaRef.current.style.height = "20px";
         textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight - 20}px`;
         onChange?.(value ?? "");
         setValue(value ?? "");
      }
   }, [value])


   return <div className={cssClasses.textAreaWrapper}>
      {<label htmlFor={id}>{label}</label>}<textarea
      className={cssClasses.textArea} id={id} ref={textAreaRef}
      value={value} onChange={handleOnChange}/>
   </div>
}