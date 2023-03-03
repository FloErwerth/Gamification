import {style} from "../../../utils/styleUtils";

export const loginStyles = (loggedIn: boolean) => style({
   loginWrapper: {},
   login: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      height: 20,
      width: 70,
      padding: 5,
      paddingRight: 10,

   },
   icon: {
      width: 30,
      transform: loggedIn ? "rotate(180deg)" : ""
   }
})