import {style} from "./utils/styleUtils";

export const mainStyles = style({
   body: {
      margin: "auto",
      width: 1100,
      "@media (max-width: 768px)": {
         marginInline: 50,
      }
   }
})