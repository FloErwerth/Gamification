import {style} from "../../utils/styleUtils";

export const styles = (tooltipWidth: number = 150, position: "start" | "end") => style({
   wrapper: {
      width: "fit-content",
      paddingLeft: position === "start" ? 25 : 0,
      paddingRight: position === "end" ? 25 : 0,
      position: "relative",
   },
   helpText: {
      position: "absolute",
      left: position === "start" ? 0 : "",
      right: position === "end" ? 0 : "",

      top: 10,
   },
   tooltip: {
      width: tooltipWidth,
   }
});