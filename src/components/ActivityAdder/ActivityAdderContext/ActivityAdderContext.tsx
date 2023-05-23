import {createContext, Dispatch, SetStateAction, useState} from "react";
import {Stat} from "../../../activitiesAssembly/stats";
import {ActivityAdder} from "../ActivityAdder";

type ActivityAdderContextType = { stats?: Stat[], setStats?: Dispatch<SetStateAction<Stat[]>>, editStat?: boolean, setEditStat?: Dispatch<SetStateAction<boolean>>, setEditedStat?: Dispatch<SetStateAction<Stat | undefined>>, editedStat?: Stat }
export const ActivityAdderContext = createContext<ActivityAdderContextType>({});


export const ActivityAdderContextProvider = () => {
   const [editStat, setEditStat] = useState(false);
   const [stats, setStats] = useState<Stat[]>([]);
   const [editedStat, setEditedStat] = useState<Stat | undefined>();
   
   return <ActivityAdderContext.Provider
      value={{
         stats,
         setStats,
         editStat,
         setEditStat,
         setEditedStat,
         editedStat
      }}><ActivityAdder/></ActivityAdderContext.Provider>
}