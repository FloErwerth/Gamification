import {style} from "../../utils/styleUtils";

export const styles = style({
   mainWrapper: {
      display: "grid",
      gridTemplateRows: "30px auto 30px",
      width: "fit-content",
      gap: 20,
      padding: 20,
      paddingBottom: 15,
   },
   statInput: {
      outline: "none",
   },
   title: {
      fontWeight: "bold",
      display: "flex",
      fontSize: 20,
      gap: 5,
   },
   statsWrapper: {
      marginBlock: 15,
      display: "flex",
      flexDirection: "column",
      gap: 5,
   },
   inputWrapper: {
      marginBlock: 15,
      display: "flex",
      flexDirection: "column",
      width: "100%",
      gap: 15,
   },
   buttons: {
      display: "flex",
      width: "100%",
   },
   button: {
      borderRadius: 3,
   },
   confirmButton: {
      outline: "1px solid black",
      borderRadius: 3,
      ":hover": {
         backgroundColor: "green",
      }
   }
})