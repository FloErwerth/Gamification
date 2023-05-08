import {style} from "../../utils/styleUtils";

export const styles = style({
   wrapper: {
      padding: 20,
      minHeight: 200,
   },
   fieldsWrapper: {
      padding: 20,
      display: "grid",
      gridTemplateColumns: "repeat(4,24.5%)",
      gap: 10,
   },
   selectableFieldsWrapper: {
      display: "grid",
      minWidth: 500,
      marginBottom: 20,
      gridTemplateColumns: "repeat(5, max(100px))",
      gap: 10,
   },
   filterButtons: {
      display: "flex",
      alignItems: "center",
      marginBlock: 30,
      gap: 5,
   }
})