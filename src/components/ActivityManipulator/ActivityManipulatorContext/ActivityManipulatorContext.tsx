import {createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useState} from "react";
import {getDefaultStats, Stat} from "../../../activitiesAssembly/stats";
import {z} from "zod";
import {toast} from "react-toastify";
import {ActivityProps} from "../../../store/activities/types";
import {addActivityInDatabase} from "../../../../firebase";
import {addActivity, updateActivity} from "../../../store/activities/activitiesActions";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {getUserId} from "../../../store/authentication/authSelectors";
import {getActivities} from "../../../store/activities/activitiesSelectors";
import {PredefinedActivities} from "../../../activitiesAssembly/predefinedActivities";
import {ActivityAssembly} from "../../../activitiesAssembly/activityAssembly";
import {getTypeFromUnit, Unit} from "../../../activitiesAssembly/units";
import {ActivityManipulatorContent} from "../ActivityManipulatorContent";
import {getActiveActivity} from "../../../store/activeActivity/activitySelector";
import produce from "immer";

const weekInterval = z.enum(["First week", "Second week", "Third week", "Fourth week"])
const defaultDays = z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
export type Day = z.infer<typeof defaultDays>;
export type WeekInterval = z.infer<typeof weekInterval>;

type ActivityNameContext = { activityName?: string, setActivityName?: (name: string) => void }
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
   handleConfirmActivityEdit?: () => void;
   editStat?: boolean,
   handleEditedStat?: (unit: Unit) => void;
   handleConfirmEdit?: () => void;
   handleCancelEdit?: () => void;
   handleStatEdit?: (stat: Stat) => void;
   setEditStat?: Dispatch<SetStateAction<boolean>>,
   setEditedStat?: Dispatch<SetStateAction<Stat | undefined>>,
   editedStat?: Stat
}
type GeneralContext = {
   withState?: boolean,
   openActivityManipulator?: (withState: boolean) => void,
   onClose?: () => void;
   onCreation?: () => void,
   activeStep?: number,
   setActiveStep?: Dispatch<SetStateAction<number>>,
   errorInfo?: { hasError: boolean, errorMessage?: string }
}

type ActivityAdderContextType =
   DaysContext
   & StatsContext
   & EditContext
   & AdderContext
   & ActivityNameContext
   & GeneralContext & WeekIntervalContext;

export const ActivityManipulatorContext = createContext<ActivityAdderContextType>({defaultDays: defaultDays.options});
export const ActivityAdderContextProvider = ({children}: PropsWithChildren) => {
   const activeActivity = useAppSelector(getActiveActivity)
   const userId = useAppSelector(getUserId);
   const currentActivities = useAppSelector(getActivities);
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
   const [withState, setWithState] = useState(false);

   const handleClose = useCallback(() => {
      setShowAdderModal(false);
      setAddAdditionalStats(false);
      setEditedStat(undefined);
      setSelectedWeekInterval([]);
      setSelectedDays([]);
      setActiveStep(0);
      setActivityName("");
   }, []);

   const handleConfirmEdit = useCallback(() => {
      if (editedStat) {
         const newStats = produce(stats, newStats => {
            const index = stats.findIndex((stat) => stat.statName === editedStat.statName);
            newStats[index] = editedStat
         });
         setStats?.(newStats);
      }
      setEditStat?.(false);
   }, [editedStat, setEditStat]);

   const handleCancelEdit = useCallback(() => {
      setEditStat?.(false);
   }, [setEditStat]);

   //convert stats if possible
   const handleEditedStat = useCallback((unit: Unit) => {
      if (editedStat) {
         const newStat: Stat = {
            statName: editedStat.statName,
            unit: unit,
            type: getTypeFromUnit(unit) ?? editedStat.type
         };
         setEditedStat?.(newStat);
      }
   }, [editedStat, setEditedStat]);

   const handleStatDeletion = useCallback((deletedField: Stat) => {
      setStats?.((prev) => prev.filter((field) => field.statName !== deletedField.statName));
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
      if (!withState) {
         if (!name) {
            setStats([]);
         }
         if (stats?.length === 0 || name !== activityName) {
            const parsedStats = getDefaultStats(ActivityAssembly(name));
            if (stats) {
               setStats(parsedStats)
            }
         }
      }
   }, [withState, activityName, stats, ActivityAssembly])

   const handleClearStats = useCallback(() => {
      setStats([]);
      if (activityName && PredefinedActivities.options.find((option) => option === activityName)) {
         setActivityName("");
      }
   }, [activityName])

   const onCreation = useCallback(() => {
      const generatedActivity: ActivityProps = {
         activityName: activityName,
         calendarEntries: {},
         stats: stats,
         daysToPerform: selectedDays.length === 0 ? defaultDays.options : selectedDays,
         weeksToPerform: selectedWeekInterval.length === 0 ? weekInterval.options : selectedWeekInterval,
      };
      addActivityInDatabase(userId, currentActivities, generatedActivity).then(() => {
         dispatch(addActivity(generatedActivity));
         toast("Activity Added", {type: "success"})
      }).catch(() => toast("Error", {type: "error"}));
      handleClose();
   }, [selectedDays, selectedWeekInterval, userId, activityName, stats]);

   const handleSetAdditionalStats = useCallback((stat: Stat) => {
      setStats((stats) => [...stats, stat]);
      setAddAdditionalStats(false);
   }, [stats])

   const handleOpenActivityManipulator = useCallback((withState: boolean) => {
      setWithState(withState);
      setShowAdderModal(true);
      if (withState) {
         setStats(activeActivity.activity.stats);
         setActivityName(activeActivity.activity?.activityName);
         setSelectedWeekInterval(activeActivity.activity?.weeksToPerform);
         setSelectedDays(activeActivity.activity?.daysToPerform);
      }
   }, [activeActivity.activity]);

   const handleConfirmActivityEdit = useCallback(() => {
      dispatch(updateActivity({
         index: activeActivity.index,
         activity: {
            ...activeActivity.activity,
            activityName: activityName,
            stats,
            daysToPerform: selectedDays,
            weeksToPerform: selectedWeekInterval
         }
      }))
      handleClose();
   }, [activeActivity, activityName, stats, selectedDays, selectedWeekInterval]);

   return <ActivityManipulatorContext.Provider
      value={{
         withState,
         handleConfirmActivityEdit,
         selectedWeekInterval,
         defaultWeekInterval: weekInterval.options,
         setWeekInterval: handleSelectedWeek,
         setActiveStep,
         activeStep,
         onCreation,
         openActivityManipulator: handleOpenActivityManipulator,
         onClose: handleClose,
         setAddAdditionalStats,
         addAdditionalStats,
         handleSetAdditionalStats,
         clearDays: () => setSelectedDays([]),
         setActivityName: handleSetActivityName,
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
      }}>
      <ActivityManipulatorContent/>
      {children}
   </ActivityManipulatorContext.Provider>
}
