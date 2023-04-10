import {style} from "../../../utils/styleUtils";

export const styles = style({
   textAreaWrapper: {
      marginBlock: 20,
      display: "grid",
      width: 400,
      gridTemplateRows: "auto auto",
   },
   textArea: {
      all: "unset",
      marginTop: 5,
      resize: "none",
      overflow: "hidden",
      height: 20,
      wordBreak: "break-all",
      outline: "1px solid lightgray",
      padding: 10,
      ":focus-visible": {
         outlineColor: "lightcoral",
      }
   }
})