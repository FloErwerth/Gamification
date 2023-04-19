import {Input, InputProps} from "./Input";
import {getClasses} from "../../utils/styleUtils";
import {inputStyles} from "./inputStyles";
import {Close} from "../../media/icons";

const cssClasses = getClasses(inputStyles);


export const InputWithDelete = ({
                                   onChange,
                                   value,
                                   validationResult,
                                   label,
                                   placeholder,
                                   type,
                                   required,
                                   customWrapperClasses,
                                   children,
                                }: InputProps) => {
   return <div className={cssClasses.inputWithDeleteWrapper}>
      <Input onChange={onChange} value={value}
             validationResult={validationResult} label={label}
             placeholder={placeholder} type={type}
             required={required}
             customWrapperClasses={customWrapperClasses}>{children}</Input>
      {value && <>
          <button className={cssClasses.delete} onClick={() => onChange("")}><Close className={cssClasses.icon}/>
          </button>
      </>}
   </div>
}