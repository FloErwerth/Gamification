import {style} from "../../utils/styleUtils";

export const landingPageStyles = style({
   wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      gap: 80,
   },

   contentLeft: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "left",
      textAlign: "left",
   },
   subtitle: {
      marginTop: 110,
      fontSize: 40,
      fontWeight: "bold",
   },
   background1: {
      zIndex: -1,
      transform: "rotate(3deg)",
      background: "rgba(0,120,255,0.5)",
      width: "150vw",
      height: 220,
      display: "flex",
      position: "absolute",
      justifyContent: "center",
      top: 625,
   },
   background2: {
      zIndex: -1,
      transform: "rotate(3deg)",
      background: "rgba(0,255,120,0.5)",
      width: "150vw",
      height: 950,
      display: "flex",
      position: "absolute",
      justifyContent: "center",
      top: 845,
   },
   section2: {
      display: "flex",
      flexDirection: "column",
      paddingTop: 100,
   },
   grid3: {
      display: "grid",
      width: 800,
      gridTemplateColumns: "repeat(3, 33%)",
      gap: 10,
      marginTop: 80,
   },
   grid2: {
      width: 400,
      display: "grid",
      margin: "auto",
      marginTop: 40,
      gridTemplateRows: "auto auto",
      gridTemplateColumns: "auto auto",
   },
   underscore: {
      textDecoration: "underline",
      textUnderlinePosition: "under",
      textDecorationColor: "#0078FF"
   },
   title: {
      fontSize: 60,
      marginBlock: 0,
      textAlign: "center",
      fontWeight: "bold",
   },
   text: {
      width: "80%",
      margin: "auto",
      fontSize: 22,
   },
   button: {
      width: 180,
      height: 50,
      fontSize: 25,
   },
})