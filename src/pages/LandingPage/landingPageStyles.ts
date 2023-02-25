import {style} from "../../utils/styleUtils";

export const landingPageStyles = style({
   wrapper: {
      margin: "auto",
      display: "flex",
      height: "calc(96vh - 70px)",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
   },
   title: {
      fontSize: 80,
      marginBlock: 0,
      textAlign: "center",
   },
   button: {
      borderRadius: 35,
      width: 200,
      height: 70,
      fontSize: 30,
      marginTop: 30,
      backgroundColor: "rgb(150, 200, 200)",
      ":hover": {
         backgroundColor: "rgba(0, 200,200)",
      }
   },
   userbutton: {
      borderRadius: 35,
      outline: "1px solid rgb(100,200,200)",
      width: 200,
      height: 70,
      ":hover": {
         backgroundColor: "rgba(100,200,200,0.5)",
      }
   }
})