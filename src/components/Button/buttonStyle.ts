import {style, Styles} from "../../utils/styleUtils";
import {ButtonThemeEnum, ButtonThemeType} from "./types";

const commonButtonStyle = (disabled?: boolean): Styles => {
   return {
      all: "unset",
      display: "block",
      borderRadius: 3,
      cursor: "pointer",
      textAlign: "center",
      outline: "0.5px solid black",
      padding: "5px 10px",
      backgroundColor: disabled ? "rgb(120,120,120)" : "",
      color: disabled ? "rgb(90,90,90)" : "",
      ":hover": {
         filter: "contrast(0.6)",
      }
   }
}

const selectedButtonTheme = () => {
   return {
      backgroundColor: "green",
   }
}

const CTAButtonTheme = (): Styles => {
   return {
      borderRadius: 5,
      color: "white",
      backgroundColor: "#0078FF",
      transition: "transform 200ms",
      outline: "none",
      ":hover": {
         transform: "translateY(-2px)",
         backgroundColor: "#0078FF",
         filter: "none",
      }
   }
}

const getButtonStyleByTheme = (theme: ButtonThemeType) => {
   switch (theme) {
      case ButtonThemeEnum.CTA:
         return CTAButtonTheme();
      case ButtonThemeEnum.SELECTED:
         return selectedButtonTheme();
   }
}

export const buttonStyle = (theme: ButtonThemeType, disabled?: boolean) => style({
   button: {
      ...commonButtonStyle(disabled), ...getButtonStyleByTheme(theme),
   }
})