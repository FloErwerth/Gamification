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
      width: "100%",
   },
   input: {
      all: "unset",
      height: 30,
      width: "100%",
      margin: 0,
      "::placeholder": {
         fontStyle: "italic",
         fontSize: 13,
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
      display: "flex",
      position: "relative",
      width: "100%",
   },
   delete: {
      all: "unset",
      cursor: "pointer",
      position: "absolute",
      zIndex: 1,
      right: 15,
      top: "50%",
      transform: "translateY(-50%)"
   },
   icon: {
      width: 12,
      height: 12,
   },
   inputWrapper: {
      display: "flex",
      outline: "3px solid white",
      padding: 5,
      marginBlock: 5,
      ":focus-within": {
         backgroundColor: "white"
      },
      borderRadius: 15, paddingInline: 10,
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

