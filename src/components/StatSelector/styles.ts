import {style} from "../../utils/styleUtils";

export const styles = style({
   wrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 20,
      padding: 20,
   },
   filterWrapper: {
      width: "fit-content",
   },
   fieldsWrapper: {
      padding: 15,

      display: "flex",
      gap: 10,
   },
   fieldsOuterWrapper: {
      height: 200,
      padding: 4,
      overflow: "auto",
   },
   selectableFieldsWrapper: {
      display: "grid",
      alignItems: "center",
      gridTemplateColumns: "repeat(4, max-content)",
      height: 200,
      gap: 10,
   },
   filterButtons: {
      display: "flex",
      alignItems: "center",
      marginBlock: 30,
      gap: 5,
   }
})