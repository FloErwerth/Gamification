import {style} from "../../utils/styleUtils";

export const styles = style({
   wrapper: {
      width: "80vw",
   },
   fieldsWrapper: {
      padding: 20,
      display: "grid",
      gridTemplateColumns: "repeat(4,24.5%)",
      gap: 10,
   },
   filterButtons: {
      display: "flex",
      gap: 5,
   }
})