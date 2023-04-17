import {style} from "../../../utils/styleUtils";

export const styles = (selected: boolean) => style({
   button: {
      backgroundColor: selected ? "rgb(200,250,200)" : "",
   }
})