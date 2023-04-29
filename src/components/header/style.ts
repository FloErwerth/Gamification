import {style, Styles} from "../../utils/styleUtils";

const flex: Styles = {
   display: "flex",
   alignItems: "center",
   flexDirection: "columns",
}

export const headerStyle = style({
   headerWrapper: {
      ...flex,
      height: 60,
      justifyContent: "space-between",
      marginBottom: 50,
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
      height: 40,
      gap: 10,
   }
});
