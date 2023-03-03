import {style} from "./utils/styleUtils";

export const mainStyles = style({
   body: {
      marginInline: "20%",
      paddingInline: 30,
      "@media (max-width: 768px)": {
         marginInline: 50,
      }
   }
})