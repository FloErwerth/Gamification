import {style} from "../../../utils/styleUtils";

export const styles = (loggedIn: boolean) => style({
   login: {
      display: "flex",
      alignItems: "center",
      height: 15,
      padding: 5,
   },
   icon: {
      height: 15,
      transform: loggedIn ? "rotate(180deg)" : "",
      marginRight: 5,
   }
})