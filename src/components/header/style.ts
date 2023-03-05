import {style, Styles} from "../../utils/styleUtils";

const flex: Styles = {
      display: "flex",
      alignItems: "center",
      flexDirection: "columns",
}

export const headerStyle = style({
   headerWrapper: {
      ...flex,
      height: 50,
      justifyContent: "space-between",
      marginBottom: 50,
      backgroundColor: "lightgray",
      paddingInline: 10,
      "@media (max-width: 768px)": {
         paddingInline: 25,
      }
   },
   signedInWrapper: {
      ...flex,
   },
   buttonWrapper: {
      ...flex,
      gap: 10,
   }
});
