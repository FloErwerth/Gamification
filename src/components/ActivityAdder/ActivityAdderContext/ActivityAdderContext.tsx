import {createContext, Dispatch, SetStateAction, useCallback, useMemo, useState} from "react";
import {getDefaultStats, Stat} from "../../../activitiesAssembly/stats";
import {ActivityAdder} from "../ActivityAdder";
import {z} from "zod";
import produce from "immer";
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

const defaultDays = z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
type Day = z.infer<typeof defaultDays>;

type GeneralContext = { onClose?: () => void, onCreation?: () => void, activeStep?: number, setActiveStep?: Dispatch<SetStateAction<number>>, errorInfo?: { hasError: boolean, errorMessage?: string } }
type ActivityNameContext = { activityName?: string, setActivitiyName?: (name: string) => void }
type AdderContext = { showAdder?: boolean, setShowAdder?: Dispatch<SetStateAction<boolean>> }
type DaysContext = {
    defaultDays: Day[],
    selectedDays?: Day[],
    clearDays?: () => void,
    setSelectedDays?: (day: Day) => void,
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

type ActivityAdderContextType = DaysContext & StatsContext & EditContext & AdderContext & ActivityNameContext & GeneralContext;
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
    const [addAdditionalStats, setAddAdditionalStats] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const errorInfo = useMemo(() => {
        if(activeStep === 0) {
            const error = !activityName
            return {hasError: error, errorText: error && "Please choose an activity name"};
        }
        if(activeStep === 1) {
            const error = !stats || (stats && stats.length === 0);
            return {hasError: error, errorText: error && "Please add stats to your activity"};
        }
        return { hasError: false, errorText: ""};
    }, [activityName,activeStep]);

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

    const handleSetActivityName = useCallback((name: PredefinedActivities) => {
        setActivityName(name);
        if(!name) {
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
            currentValue: 0,
            level: 0,
        };
        addActivityInDatabase(userId, currentActivites, generatedActivity).then(() => {
            dispatch(addActivity(generatedActivity));
        });
    }, [userId, activityName, stats]);

    const handleSetAdditionalStats = useCallback((stat: Stat) => {
        setStats((stats) => [...stats, stat]);
        setAddAdditionalStats(false);
    }, [stats])

    const handleSetAddedStats = useCallback((newStats: Stat[]) => {
        if (newStats.length === 0) {
            setStats?.([]);
            return;
        }
        const newDefaultStats = newStats.filter((stat) => !stats?.find((curStat) => curStat.name === stat.name));
        setStats([...stats, ...newDefaultStats]);
    }, [activityName, stats]);

    return <ActivityAdderContext.Provider
        value={{
            setActiveStep, activeStep, errorInfo,
            onCreation,
            onClose: handleClose,
            setAddAdditionalStats, addAdditionalStats, handleSetAdditionalStats,
            clearDays: () => setSelectedDays([]),
            setActivitiyName: handleSetActivityName, activityName,
            showAdder: showAdderModal, setShowAdder: setShowAdderModal,
            defaultDays: defaultDays.options,
            selectedDays, setSelectedDays: handleSelectedDays,
            clearStats: handleClearStats, stats, setStats, handleStatDeletion,
            editStat, setEditStat, setEditedStat, editedStat, handleStatEdit, handleEditedStat, handleConfirmEdit, handleCancelEdit
        }}><ActivityAdder/></ActivityAdderContext.Provider>
}