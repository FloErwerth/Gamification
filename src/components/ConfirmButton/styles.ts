import {style} from "../../utils/styleUtils";

export const styles = (progress: number, barColor: string, textColor: string, backgroundColor: string, hoverColor: string) => style({
   button: {
      all: "unset",
      width: 200,
      position: "relative",
      borderRadius: 5,
      height: "auto",
      backgroundColor,
      transition: "all 100ms",
      ":hover": {
         cursor: "pointer",
         backgroundColor: hoverColor,
      },
      "&::before": {
         content: "''",
         display: "block",
         position: "absolute",
         borderRadius: 5,
         height: "100%",
         top: 0,
         left: 0,
         backgroundColor: barColor,
         mixBlendMode: "multiply",
         width: `${progress}%`,
      },
   },
   buttonContent: {
      textAlign: "center",
      color: textColor,
   }
})