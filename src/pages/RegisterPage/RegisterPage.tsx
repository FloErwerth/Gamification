import {getClasses} from "../../utils/styleUtils";
import {registerStyles} from "./Steps/registerStyles";
import {FormWrapper} from "../../components/basicComponents/FormWrapper/FormWrapper";
import {Register} from "./Steps/Register";


const cssClasses = getClasses(registerStyles);


export const RegisterPage = () => {


   return <FormWrapper>
      <Register/>
   </FormWrapper>
}
