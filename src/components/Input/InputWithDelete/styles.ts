import {style} from "../../../utils/styleUtils";

export const styles = style({
   inputWithDeleteWrapper: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "auto 24px",
      alignItems: "center",
      height: "fit-content",
      "& > div > div > input": {
         paddingRight: 30,
      },
      outline: "3px solid black",
      borderRadius: 5,
      transition: "outline-color 200ms",
   },
   noOutline: {
      outline: "none",
   },
   icon: {
      width: 12,
      height: 12,
   },
   delete: {
      all: "unset",
      cursor: "pointer",
      right: 10,
   },
})