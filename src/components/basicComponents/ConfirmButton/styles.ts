import {style} from "../../../utils/styleUtils";

export const styles = (progress: number, barColor: string, textColor: string, backgroundColor: string, hoverColor: string) => style({
   button: {
      all: "unset",
      width: 200,
      height: 50,
      position: "relative",
      borderRadius: 5,
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
         top: 0,
         left: 0,
         height: 50,
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