import {style} from "./utils/styleUtils";

export const mainStyles = style({
   body: {
      margin: "auto",
      width: 900,
      "@media (max-width: 768px)": {
         marginInline: 50,
      }
   }
})