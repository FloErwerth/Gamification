import {style} from "../../../utils/styleUtils";
import {keyframes} from "@emotion/css";

const errorMessageAnimation = keyframes({
      from: {
         opacity: 0,
         top: -10,
      }, to: {
         top: 5,
         opacity: 1,
      }
   }
)

export const inputStyles = style({
   wrapper: {
      cursor: "text",
   },
   input: {
      all: "unset",
      height: 30,
      width: "100%",
      padding: 5,
      paddingInline: 15,
      "::placeholder": {
         fontSize: 13,
         color: "rgb(50,50,50)"
      },
      ":-webkit-autofill, :-webkit-autofill:hover, :-webkit-autofill:focus": {
         "-webkit-box-shadow": " 0 0 0px 1000px white inset",
      },
      "::-webkit-outer-spin-button": {
         "-webkit-appearance": "none"
      },
      "::-webkit-inner-spin-button": {
         "-webkit-appearance": "none"
      }, "input[type=number]": {
         "-moz-appearance": "textfield",
      }
   },
   inputWithDeleteWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      "& > div > div > input": {
         paddingRight: 30,
      },
   },
   delete: {
      all: "unset",
      position: "absolute",
      cursor: "pointer",
      right: 10,
   },
   icon: {
      width: 12,
      height: 12,
   },
   inputWrapper: {
      display: "flex",
      outline: "3px solid black",
      ":focus-within": {
         outlineColor: "#0078FF"
      },
      borderRadius: 5,
      transition: "outline-color 200ms",
      alignItems: "center",
      justifyContent: "space-between",
   },
   label: {},
   error: {
      outlineColor: "red",
   },
   errorMessage: {
      position: "relative",
      animation: `${errorMessageAnimation} 300ms forwards`,
      fontSize: 12,
      fontStyle: "italic"
   }
});

