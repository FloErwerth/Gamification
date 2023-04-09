import {cx} from "@emotion/css";
import {getClasses} from "../../../utils/styleUtils";
import {buttonStyle} from "./buttonStyle";
import {PropsWithChildren, useMemo} from "react";

export interface ButtonProps extends PropsWithChildren {
   className?: string;
   onClick?: () => void;
   disabled?: boolean
}

export const Button = ({disabled, className, onClick, children}: ButtonProps) => {
   const cssClasses = useMemo(() => getClasses(buttonStyle(disabled)), [disabled]);
   const buttonClasses = useMemo(() => cx(cssClasses.button, className), [cssClasses.button, className]);
   return <button disabled={disabled} onClick={onClick} className={buttonClasses}>{children}</button>
}