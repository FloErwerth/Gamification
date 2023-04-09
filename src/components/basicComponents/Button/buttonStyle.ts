import {style} from "../../../utils/styleUtils";

export const buttonStyle = (disabled?: boolean) => style({
   button: {
      all: "unset",
      display: "block",
      borderRadius: 5,
      cursor: "pointer",
      textAlign: "center",
      backgroundColor: disabled ? "rgb(200,200,200)" : "",
      color: disabled ? "rgb(170,170,170)" : "",
      ":hover": {
         backgroundColor: disabled ? "" : "rgb(220,220,220)",
      }
   }
})