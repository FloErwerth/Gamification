import {style} from "../../utils/styleUtils"

export const styles = style({
   checkmark: {
      position: "relative",
   },
   icon: {
      width: 20,
      height: 20,
      borderRadius: "100%",
      padding: 0,
   },
   label: {
      fontSize: 14,
   },
   wrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
   }
})