import {style} from "../../utils/styleUtils";

export const modalStyle = style({
   modal: {
      border: "none",
      position: "relative",
      borderRadius: 10,
      padding: 0,
      "::backdrop": {
         background: "linear-gradient(160deg, #444444aa, #666666aa 41.07%, #444444aa 76.96%)",
      }
   },
   close: {
      position: "absolute",
      top: 4,
      width: 20,
      height: 20,
      right: 4,
      borderRadius: "100%",
      outline: "none",
   }
})