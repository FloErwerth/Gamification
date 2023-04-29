import {style} from "../../utils/styleUtils";

export const styles = style({
   wrapper: {
      marginInline: 30,
      marginBlock: 50,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      gap: 50,
   },
   buttonWrapper: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      gap: 15,
   },
   inputWrapper: {
      display: "flex",
      flexDirection: "column",
      width: 300,
      gap: 20,
      justifyContent: "center",
      marginInline: "auto"
   },
   loginButton: {
      width: 150,
      height: 30,
   },
   registerLink: {
      all: "unset",
      marginInline: "auto",
      cursor: "pointer",
      ":hover": {
         textDecoration: "underline",
      }
   }
})