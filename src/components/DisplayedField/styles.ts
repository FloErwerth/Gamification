import {style} from "../../utils/styleUtils";

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

export const editableStyles = style({
   editableChip: {
      width: "75%",
      height: "100%",
      cursor: "pointer",
   },
   root: {
      gap: 10,

   },
   editableChipLabel: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      height: "80%",

      "& > div": {
         position: "absolute",
         top: -25,
         transition: "top 200ms",
      },
      "& > span": {
         position: "relative",
         top: 0,
         transition: "top 200ms",
      },

      ":hover": {
         "& > span": {
            top: 25,
            transitionDelay: "100ms",

         },
         "& > div": {
            display: "flex",
            alignItems: "center",
            paddingLeft: 10,
            top: 0,
            left: 3,
            borderRadius: 20,
            transitionDelay: "100ms",

            ":hover": {
               backgroundColor: "rgba(0,0,0,0.1)",
            }
         },
      },
   }
})