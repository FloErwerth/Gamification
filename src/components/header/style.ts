import {style} from "../../utils/styleUtils";

export const headerStyle = style({
   headerWrapper: {
      height: 50,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgb(220,220,220)",
      paddingInline: "10%",
      "@media (max-width: 768px)": {
         paddingInline: 50,
      }
   },
});
