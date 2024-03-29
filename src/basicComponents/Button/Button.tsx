import {cx} from "@emotion/css";
import {getClasses} from "../../utils/styleUtils";
import {buttonStyle} from "./buttonStyle";
import {PropsWithChildren, useMemo} from "react";
import {Button as MuiButton} from "@mui/material";
import {ButtonThemeEnum, ButtonThemeType} from "./types";

export interface ButtonProps extends PropsWithChildren {
   theme?: ButtonThemeType,
   className?: string;
   onClick?: () => void;
   disabled?: boolean
}

export const Button = ({
                          theme = ButtonThemeEnum.outlined,
                          disabled,
                          className,
                          onClick,
                          children,
                       }: ButtonProps) => {
   const cssClasses = useMemo(() => getClasses(buttonStyle(theme, disabled)), [disabled, theme]);
   const buttonClasses = useMemo(() => cx(cssClasses.button, className), [cssClasses.button, className]);
   return <MuiButton variant={theme} disabled={disabled} onClick={onClick}
                     className={buttonClasses}>{children}</MuiButton>
}