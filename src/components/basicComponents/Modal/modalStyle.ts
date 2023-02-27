import {style} from "../../../utils/styleUtils";

export const modalStyle = style({
   modal: {
      minWidth: 400,
      border: "none",
      position: "relative",
      borderRadius: 10,
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
      ":hover": {
         filter: "invert(1)"
      }
   }
})