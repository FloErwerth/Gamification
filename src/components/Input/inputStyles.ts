import {style, Styles} from "../../utils/styleUtils";
import {keyframes} from "@emotion/css";
import {LabelMode} from "./Input";

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

const getLabelStyles = (labelMode: LabelMode): Styles => {
   if (labelMode === LabelMode.TOP) {
      return {
         top: "50%",
         transform: "translateY(-50%)",
         marginLeft: 5,
      }
   }

   return {
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "0.8em",
      marginLeft: 15,
   }
}

const moveLabelUp = (labelMode: LabelMode): Styles => {
   return {
      transform: labelMode === LabelMode.TOP ? "translateY(0)" : "",
      top: labelMode === LabelMode.TOP ? 0 : "",
      fontSize: 12,
      color: "black",

   }
}

export const inputStyles = (labelMode: LabelMode) => style({
   wrapper: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      cursor: "text",

   },
   input: {
      all: "unset",
      height: 30,

      padding: labelMode === LabelMode.TOP ? "10px 5px 0px 5px" : 5,
      paddingInline: 15,
      display: "flex",
      outline: "3px solid black",
      ":focus-within": {
         outlineColor: "#0078FF",
         "& + label": {
            ...moveLabelUp(labelMode),

         }
      },
      ":not(:placeholder-shown)": {
         "& + label": {
            ...moveLabelUp(labelMode)
         }
      },
      borderRadius: 5,
      transition: "outline-color 200ms",
      alignItems: "center",
      justifyContent: "space-between",
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
      },

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
   label: {
      color: "rgb(150,150,150)",
      position: "absolute",
      ...getLabelStyles(labelMode),
      transition: "100ms",
      cursor: "text",

   },
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

