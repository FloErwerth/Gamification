import {style} from "../../utils/styleUtils";

export const loginStyles = style({
   title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
   },
   buttonWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
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
      marginInline: "auto",
      width: 290,
      height: 45,
      borderRadius: 22,
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