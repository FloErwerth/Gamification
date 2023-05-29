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
type GeneralContext = { withState?: boolean, openActivityManipulator?: (withState: boolean) => void, onClose?: () => void; onCreation?: () => void, activeStep?: number, setActiveStep?: Dispatch<SetStateAction<number>>, errorInfo?: { hasError: boolean, errorMessage?: string } }

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

   //fix bug where weekday selection is not transfered (disselect monday, confirm, reopen edit, monday still selected)

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
      addActivityInDatabase(userId, currentActivities, generatedActivity).then(() => {
         dispatch(addActivity(generatedActivity));
      });
   }, [selectedDays, selectedWeekInterval, userId, activityName, stats]);

   const handleSetAdditionalStats = useCallback((stat: Stat) => {
      setStats((stats) => [...stats, stat]);
      setAddAdditionalStats(false);
   }, [stats])

   const handleOpenActivityManipulator = useCallback((withState: boolean) => {
      console.log("open");
      setWithState(withState);
      setShowAdderModal(true);
      if (withState) {
         setStats(activeActivity.activity.stats);
         setActivityName(activeActivity.activity.name);
         setSelectedWeekInterval(activeActivity.activity.weeklyInterval);
         setSelectedDays(activeActivity.activity.weekdays);
      }
   }, [activeActivity.activity.stats, activeActivity.activity.name, activeActivity.activity.weeklyInterval, activeActivity.activity.weekdays]);

   const handleConfirmActivityEdit = useCallback(() => {
      dispatch(updateActivity({
         index: activeActivity.index,
         activity: {
            ...activeActivity.activity,
            name: activityName,
            stats,
            weekdays: selectedDays,
            weeklyInterval: selectedWeekInterval
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
