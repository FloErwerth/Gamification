import {PropsWithChildren} from "react";
import {formWrapperStyles} from "./formWrapperStyles";
import {getClasses} from "../../utils/styleUtils";

const cssClasses = getClasses(formWrapperStyles);
export const FormWrapper = ({children}: PropsWithChildren) => {
   return <div className={cssClasses.formWrapper}>{children}</div>
}