import {style} from "../../utils/styleUtils";

export const stepsStyles = (width: number) => style({
   wrapper: {
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      "::after": {
         content: '""',
         position: "absolute",
         top: "50%",
         transform: "translateY(-50%)",
         display: "block",
         height: 5,
         width: `${width}%`,
         background: "black",
         transition: "width 200ms, background 400ms",
      }
   },
})

export const stepStyle = {
   step: {
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      background: "white",
      height: 50,
      borderRadius: "50%",
      transition: "outline-color 300ms",
      outline: "2px solid transparent",
   },
   previousStep: {
      cursor: "pointer",
      outline: "2px solid green",
      backgroundColor: "lightgreen"
   },
   activeStep: {
      fontWeight: "bold",
      outline: "2px solid black",
   }
}
