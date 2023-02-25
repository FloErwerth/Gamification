import {EyeClosed, EyeOpened} from "../../../../media/icons";
import {getClasses} from "../../../../utils/styleUtils";
import {togglerStyles} from "./togglerStyles";

interface PasswordVisibilityTogglerProps {
   show: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const cssClasses = getClasses(togglerStyles);

export const PasswordVisibiltyToggler = ({show, setShow}: PasswordVisibilityTogglerProps) => {

   return <button className={cssClasses.toggler} onClick={() => setShow((showPW) => !showPW)}>{show ? <EyeClosed/> :
      <EyeOpened/>}</button>
}