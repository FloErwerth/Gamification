import {style} from "../../utils/styleUtils";

export const styles = {
   activityWrapper: {
      width: "100%",
   }
} as const;

export const wrapperStyles = style({
   activityWrapper: {
      textAlign: "left",
      padding: "5px 7px 10px 15px",
      ":hover": {
         filter: "none",
         backgroundColor: "rgb(235,235,255)",
      }
   },
   text: {
      fontSize: 20,
      marginBottom: 5,
   }
})