import {style} from "../../utils/styleUtils";

export const styles = style({
   hideArrows: {
      "input::-webkit-outer-spin-button,input::-webkit-inner-spin-button": {
         "-webkitAppearance": "none",
         margin: 0
      },
      "input[type=number]": {
         "-mozAppearance": "textfield",
      }
   }
});