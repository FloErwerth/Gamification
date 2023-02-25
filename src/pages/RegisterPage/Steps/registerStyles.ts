import {style} from "../../../utils/styleUtils";

export const registerStyles = style({
   title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
   },
   stepsWrapper: {
      width: "80%",
      marginInline: "auto",
   },
   inputWrapper: {
      display: "flex",
      flexDirection: "column",
      width: 300,
      gap: 20,
      justifyContent: "center",
      marginInline: "auto",
      marginBottom: 20,
   },
   loginButton: {
      marginInline: "auto",
      width: 290,
      height: 45,
      borderRadius: 22,
   },
   registerLink: {
      marginInline: "auto",
      cursor: "pointer",
      ":hover": {
         textDecoration: "underline",
      }
   }
})