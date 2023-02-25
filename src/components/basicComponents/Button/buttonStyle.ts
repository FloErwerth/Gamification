import {style} from "../../../utils/styleUtils";

export const buttonStyle = style({
   button: {
      all: "unset",
      display: "block",
      borderRadius: 5,
      cursor: "pointer",
      textAlign: "center",
      ":hover": {
         backgroundColor: "rgb(220,220,220)",
      }
   }
})