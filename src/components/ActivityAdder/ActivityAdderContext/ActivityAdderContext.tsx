import {createContext, Dispatch, SetStateAction, useCallback, useState} from "react";
import {getDefaultStats, Stat} from "../../../activitiesAssembly/stats";
import {ActivityAdder} from "../ActivityAdder";
import {z} from "zod";
import {toast} from "react-toastify";
import {ActivityProps} from "../../../store/activities/types";
import {addActivityInDatabase} from "../../../../firebase";
import {addActivity} from "../../../store/activities/activitiesActions";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {getUserId} from "../../../store/authentication/authSelectors";
import {getActivities} from "../../../store/activities/activitiesSelectors";
import {PredefinedActivities} from "../../../activitiesAssembly/predefinedActivities";
import {ActivityAssembly} from "../../../activitiesAssembly/activityAssembly";
import {getTypeFromUnit, Unit} from "../../../activitiesAssembly/units";

const weekInterval = z.enum(["First week", "Second week", "Third week", "Fourth week"])
const defaultDays = z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
export type Day = z.infer<typeof defaultDays>;
export type WeekInterval = z.infer<typeof weekInterval>;

type GeneralContext = { onClose?: () => void, onCreation?: () => void, activeStep?: number, setActiveStep?: Dispatch<SetStateAction<number>>, errorInfo?: { hasError: boolean, errorMessage?: string } }
type ActivityNameContext = { activityName?: string, setActivitiyName?: (name: string) => void }
type AdderContext = { showAdder?: boolean, setShowAdder?: Dispatch<SetStateAction<boolean>> }
type DaysContext = {
   defaultDays: Day[],
   selectedDays?: Day[],
   clearDays?: () => void,
   setSelectedDays?: (day: Day) => void,
}
type WeekIntervalContext = {
   defaultWeekInterval?: WeekInterval[],
   selectedWeekInterval?: WeekInterval[],
   setWeekInterval?: (week: WeekInterval) => void,
}
type StatsContext = {
   handleSetAdditionalStats?: (stat: Stat) => void;
   setAddAdditionalStats?: Dispatch<SetStateAction<boolean>>,
   addAdditionalStats?: boolean,
   clearStats?: () => void,
   stats?: Stat[],
   setStats?: Dispatch<SetStateAction<Stat[]>>,
   handleStatDeletion?: (stat: Stat) => void
}
type EditContext = {
   editStat?: boolean,
   handleEditedStat?: (unit: Unit) => void;
   handleConfirmEdit?: () => void;
   handleCancelEdit?: () => void;
   handleStatEdit?: (stat: Stat) => void;
   setEditStat?: Dispatch<SetStateAction<boolean>>,
   setEditedStat?: Dispatch<SetStateAction<Stat | undefined>>,
   editedStat?: Stat
}

type ActivityAdderContextType =
   DaysContext
   & StatsContext
   & EditContext
   & AdderContext
   & ActivityNameContext
   & GeneralContext & WeekIntervalContext;
export const ActivityAdderContext = createContext<ActivityAdderContextType>({defaultDays: defaultDays.options});

export const ActivityAdderContextProvider = () => {

   const userId = useAppSelector(getUserId);
   const currentActivites = useAppSelector(getActivities);
   const dispatch = useAppDispatch();
   const [activityName, setActivityName] = useState("");
   const [showAdderModal, setShowAdderModal] = useState(false);
   const [editStat, setEditStat] = useState(false);
   const [stats, setStats] = useState<Stat[]>([]);
   const [editedStat, setEditedStat] = useState<Stat | undefined>();
   const [selectedDays, setSelectedDays] = useState<Day[]>([]);
   const [selectedWeekInterval, setSelectedWeekInterval] = useState<WeekInterval[]>([]);
   const [addAdditionalStats, setAddAdditionalStats] = useState(false);
   const [activeStep, setActiveStep] = useState(0);


   const handleClose = useCallback(() => {
      setShowAdderModal(false);
      setAddAdditionalStats(false);
   }, []);

   const handleConfirmEdit = useCallback(() => {
      if (editedStat) {
         setStats?.((stats) => {
            stats.splice(stats.findIndex((stat) => stat.name === editedStat.name), 1, editedStat)
            return stats;
         });
      }
      setEditStat?.(false);
   }, [editedStat, setEditStat]);

   const handleCancelEdit = useCallback(() => {
      setEditStat?.(false);
   }, [setEditStat]);

   const handleEditedStat = useCallback((unit: Unit) => {
      if (editedStat) {
         const newStat: Stat = {
            name: editedStat.name,
            preferedUnit: unit,
            type: getTypeFromUnit(unit) ?? editedStat.type
         };
         setEditedStat?.(newStat);
      }
   }, [editedStat, setEditedStat]);

   const handleStatDeletion = useCallback((deletedField: Stat) => {
      setStats?.((prev) => prev.filter((field) => field.name !== deletedField.name));
   }, [stats]);

   const handleStatEdit = useCallback((stat: Stat) => {
      setEditStat?.(true);
      setEditedStat?.(stat);
   }, [setEditedStat, setEditedStat])

   const handleSelectedDays = useCallback((day: Day) => {
      if (selectedDays.includes(day)) {
         setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
      } else {
         setSelectedDays([...selectedDays, day]);
      }
   }, [selectedDays]);

   const handleSelectedWeek = useCallback((week: WeekInterval) => {
      if (selectedWeekInterval.includes(week)) {
         setSelectedWeekInterval(selectedWeekInterval.filter((selectedWeek) => selectedWeek !== week));
      } else {
         setSelectedWeekInterval([...selectedWeekInterval, week]);
      }
   }, [selectedWeekInterval]);

   const handleSetActivityName = useCallback((name: PredefinedActivities) => {
      setActivityName(name);
      if (!name) {
         setStats([]);
      }
      if (stats?.length === 0 || name !== activityName) {
         const parsedStats = getDefaultStats(ActivityAssembly(name));
         if (stats) {
            setStats(parsedStats)
         }
      }
   }, [activityName, stats, ActivityAssembly])

   const handleClearStats = useCallback(() => {
      setStats([]);
      if (activityName && PredefinedActivities.options.find((option) => option === activityName)) {
         setActivityName("");
      }
   }, [activityName])

   const onCreation = useCallback(() => {
      toast("Activity Added", {type: "success"})
      setShowAdderModal(false);
      const generatedActivity: ActivityProps = {
         name: activityName,
         calendarEntries: {},
         stats: stats,
         maxValue: 1,
         weekdays: selectedDays.length === 0 ? defaultDays.options : selectedDays,
         weeklyInterval: selectedWeekInterval.length === 0 ? weekInterval.options : selectedWeekInterval,
         currentValue: 0,
         level: 0,
      };
      addActivityInDatabase(userId, currentActivites, generatedActivity).then(() => {
         dispatch(addActivity(generatedActivity));
      });
   }, [selectedDays, selectedWeekInterval, userId, activityName, stats]);

   const handleSetAdditionalStats = useCallback((stat: Stat) => {
      setStats((stats) => [...stats, stat]);
      setAddAdditionalStats(false);
   }, [stats])

   return <ActivityAdderContext.Provider
      value={{
         selectedWeekInterval,
         defaultWeekInterval: weekInterval.options,
         setWeekInterval: handleSelectedWeek,
         setActiveStep,
         activeStep,
         onCreation,
         onClose: handleClose,
         setAddAdditionalStats,
         addAdditionalStats,
         handleSetAdditionalStats,
         clearDays: () => setSelectedDays([]),
         setActivitiyName: handleSetActivityName,
         activityName,
         showAdder: showAdderModal,
         setShowAdder: setShowAdderModal,
         defaultDays: defaultDays.options,
         selectedDays,
         setSelectedDays: handleSelectedDays,
         clearStats: handleClearStats,
         stats,
         setStats,
         handleStatDeletion,
         editStat,
         setEditStat,
         setEditedStat,
         editedStat,
         handleStatEdit,
         handleEditedStat,
         handleConfirmEdit,
         handleCancelEdit
      }}><ActivityAdder/></ActivityAdderContext.Provider>
}