import {Input} from "../../../components/basicComponents/Input/Input";
import {useState} from "react";

export const Credentials = () => {
   const [name, setName] = useState("");
   return (<>
      <Input id={"name"} label={"Display Name"} onChange={(value) => setName(value)} value={name}/>
   </>)
}