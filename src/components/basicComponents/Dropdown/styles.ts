import {style} from "../../../utils/styleUtils";

const scrollbarStyles = {
   "::-webkit-scrollbar": {
      "-webkit-appearance": "none",
   },
   "::-webkit-scrollbar:vertical": {
      width: 12,
   },
   "::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0, 0, 0, .5)",
      borderRadius: 6,
      border: "2px solid #ffffff",
   },
   "::-webkit-scrollbar-track": {
      borderRadius: 12,
      backgroundColor: "#ffffff",
   },
}

export const styles = (open: boolean, valueChosen: boolean) => style({
   dropdownWrapper: {
      position: "relative",
      width: "100%",
   },
   toggle: {
      borderRadius: 6,
      border: "none",
      alignItems: "center",
      backgroundColor: "lightgray",
      height: 40,
      color: valueChosen ? "" : "rgb(90,90,90)",
      display: "grid",
      width: "100%",
      gridTemplateColumns: "auto 15px"
   },
   icon: {
      transform: `rotate(${open ? 180 : 0}deg)`
   },
   dropdownList: {
      outline: "1px solid lightgray",
      borderRadius: 6,
      position: "relative",
      listStyle: "none",
      padding: 0,
      marginTop: 5,
      maxHeight: 200,
      overflowY: "auto",
      ...scrollbarStyles,
      "& > :first-child": {
         borderTopLeftRadius: 6,
         borderTopRightRadius: 6,
      },
      "& > :last-child": {
         borderBottomLeftRadius: 6,
         borderBottomRightRadius: 6,
      },
   },
   dropdownItem: {
      textAlign: "left",
      width: "100%",
      height: 30,
      backgroundColor: "white",
      border: "none",
      borderRadius: "inherit",
      ":hover": {
         backgroundColor: "lightgray",
      },
      cursor: "pointer",
   },
})