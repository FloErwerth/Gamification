import {cx} from "@emotion/css";
import {getClasses} from "../../../utils/styleUtils";
import {buttonStyle} from "./buttonStyle";
import {PropsWithChildren, useMemo} from "react";

interface ButtonProps extends PropsWithChildren {
   className?: string;
   onClick?: () => void;
}

const cssClasses = getClasses(buttonStyle);

export const Button = ({className, onClick, children}: ButtonProps) => {
   const buttonClasses = useMemo(() => cx(cssClasses.button, className), [cssClasses.button, className]);
   return <button onClick={onClick} className={buttonClasses}>{children}</button>
}