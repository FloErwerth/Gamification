import {style} from "../../../../utils/styleUtils";

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
   }, select: {
      "& *": {
         borderRadius: 0,
      }
   },

}

export const editableStyles = style({
   root: {
      gap: 10,
   },

   editableChipLabel: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      height: "80%",

      "& > :first-child": {
         position: "absolute",
         height: "100%",
         width: "100%",
         top: -25,
         transition: "top 200ms",
      },
      "& > :last-child": {
         position: "relative",
         top: 0,
         transition: "top 200ms",
      },

      ":hover": {
         "& > :last-child": {
            top: 25,
            transitionDelay: "100ms",
         },
         "& > :first-child": {
            display: "flex",
            alignItems: "center",
            paddingLeft: 10,
            top: 0,
            left: 3,
            borderRadius: 20,
            transitionDelay: "100ms",
         },
      },
   }
})