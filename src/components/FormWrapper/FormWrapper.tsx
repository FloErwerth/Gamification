import {PropsWithChildren} from "react";
import {getClasses} from "../../../utils/styleUtils";
import {formWrapperStyles} from "./formWrapperStyles";

const cssClasses = getClasses(formWrapperStyles);
export const FormWrapper = ({children}: PropsWithChildren) => {
   return <div className={cssClasses.formWrapper}>{children}</div>
}