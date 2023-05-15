import {style} from "../../utils/styleUtils";
import {keyframes} from "@emotion/css";

export const styles = {
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
      padding: 3,
      outline: "none",
   },
   icon: {
      width: 20,
      height: 20,
   },
}

const editLabelAnimation = keyframes({
   from: {
      top: -25,
      transform: "translateY(0)",
   },
   to: {
      top: 0,
      transform: "translateY(-50%)",
   }
})

export const editableStyles = style({
   editableChipLabel: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      height: "100%",
      "& > div": {
         position: "absolute",
         top: -25,
         transition: "top 100ms",
      },
      "& > span": {
         position: "relative",
         top: 0,
         transition: "top 100ms",
      },

      ":hover": {
         "& > span": {
            top: 25,
         },
         "& > div": {
            top: 8,
         },
      },
   }
})