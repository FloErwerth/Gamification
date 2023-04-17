import {style} from "../../../utils/styleUtils";

export const styles = style({
   fieldWrapper: {
      padding: 10,
      borderRadius: 5,
      outline: "1px solid black",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },
   fieldName: {
      fontWeight: "bold",
   },
   deleteButton: {
      width: 20,
      height: 20,
      padding: 3,
      outline: "none",
   },
   icon: {
      fill: "red",
      width: 20,
      height: 20,
   }
})