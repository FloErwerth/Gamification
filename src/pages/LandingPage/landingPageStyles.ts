import {style} from "../../utils/styleUtils";

export const landingPageStyles = style({
   wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center", textAlign: "center",
      gap: 40,
   },
   section1: {
      zIndex: -1,
      transform: "rotate(3deg)",
      background: "rgba(0,120,255,0.5)",
      width: "150vw",
      height: 220,
      display: "flex",
      position: "absolute",
      justifyContent: "center",
      top: 450,
   },
   grid3: {
      display: "grid",
      width: 800,
      gridTemplateColumns: "repeat(3, 33%)",
      gap: 10,
      marginTop: 80,
   },
   game: {
      textDecoration: "underline",
      textUnderlinePosition: "under",
      textDecorationColor: "#0078FF"
   },
   title: {
      fontSize: 48,
      marginBlock: 0,
      textAlign: "center",
   },
   text: {
      width: "80%",
   },
   button: {
      width: 115,
      height: 35,
      fontSize: 15,
   },
})