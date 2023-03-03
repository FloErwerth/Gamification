import {style} from "../../utils/styleUtils";

export const headerStyle = style({
   headerWrapper: {
      height: 50,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 50,
      backgroundColor: "lightgray",
      paddingInline: 10,
      "@media (max-width: 768px)": {
         paddingInline: 50,
      }
   },
   signedInWrapper: {
      display: "grid",
      gridTemplateColumns: "auto 30px",
   }
});
