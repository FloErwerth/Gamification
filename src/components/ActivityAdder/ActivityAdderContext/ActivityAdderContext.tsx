import {createContext, Dispatch, SetStateAction, useCallback, useState} from "react";
import {Stat} from "../../../activitiesAssembly/stats";
import {ActivityAdder} from "../ActivityAdder";
import {z} from "zod";
import produce from "immer";

export const defaultDays = z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
type Day = z.infer<typeof defaultDays>;
type ActivityAdderContextType = { defaultDays: Day[], selectedDays?: Day[], setSelectedDays?: (day: Day) => void, stats?: Stat[], setStats?: Dispatch<SetStateAction<Stat[]>>, editStat?: boolean, setEditStat?: Dispatch<SetStateAction<boolean>>, setEditedStat?: Dispatch<SetStateAction<Stat | undefined>>, editedStat?: Stat }
export const ActivityAdderContext = createContext<ActivityAdderContextType>({defaultDays: defaultDays.options});


export const ActivityAdderContextProvider = () => {
   const [editStat, setEditStat] = useState(false);
   const [stats, setStats] = useState<Stat[]>([]);
   const [editedStat, setEditedStat] = useState<Stat | undefined>();
   const [selectedDays, setSelectedDays] = useState<Day[]>([]);

   const handleSelectedDays = useCallback((day: Day) => {
      if (selectedDays.includes(day)) {
         setSelectedDays(produce(selectedDays, newDays => {
            newDays.splice(selectedDays.indexOf(day), 1);
         }))
      } else {
         const newDays = [...selectedDays, day];
         setSelectedDays(newDays);
      }
   }, [selectedDays]);

   return <ActivityAdderContext.Provider
      value={{
         defaultDays: defaultDays.options,
         selectedDays, setSelectedDays: handleSelectedDays,
         stats,
         setStats,
         editStat,
         setEditStat,
         setEditedStat,
         editedStat
      }}><ActivityAdder/></ActivityAdderContext.Provider>
}