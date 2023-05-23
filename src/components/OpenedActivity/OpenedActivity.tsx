import {ActivityProps, DateType} from "../../store/activities/types";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {getGeneratedDisplayDate} from "../calendar/utils";
import {useCallback, useMemo, useState} from "react";
import produce from "immer";
import {DisplayedProgress} from "../DisplayedProgress/DisplayedProgress";
import {Button} from "../../basicComponents/Button/Button";
import {ConfirmButton} from "../ConfirmButton/ConfirmButton";
import {useAppSelector} from "../../store/store";
import {getCell} from "../../store/activities/activitiesSelectors";
import {StatWithValue} from "../../activitiesAssembly/stats";
import {ActivityInput} from "../ActivityInput/ActivityInput";

interface OpenedActivityProps {
   activeActivity: { index: number, activity: ActivityProps },
   onConfirmProgress: (stats: StatWithValue[]) => void;
   onDeleteProgress: () => void;
   onInfoChange?: (info: string) => void;
   date: DateType,
}

const cssClasses = getClasses(styles);

export const OpenedActivity = ({
                                  activeActivity,
                                  date,
                                  onConfirmProgress,
                                  onDeleteProgress
                               }: OpenedActivityProps) => {

   const cell = useAppSelector(getCell(activeActivity.index, date));
   const cellMarked = useMemo(() => cell && cell.marked, [cell]);

   const [stats, setStats] = useState<StatWithValue[]>(activeActivity.activity.stats.map((stat) => {
      return {name: stat.name, value: ""}
   }));

   const handleStatsChange = useCallback((value: string, index: number) => {
      if (!cellMarked) {
         setStats((old) => produce(old, newStats => {
            if (!value) {
               newStats[index].value = "";
            } else {
               newStats[index].value = parseFloat(value);
            }
         }));
      }
   }, [stats]);

   const handleConfirm = useCallback(() => {
      if (stats.every((stat) => Boolean(stat.value))) {
         onConfirmProgress(stats);
      }
   }, [stats])

   return <div className={cssClasses.mainWrapper}>
      <div className={cssClasses.title}>{getGeneratedDisplayDate(date)}</div>
      <div>
         {cellMarked && cell.stats && <>
             <small>Here is the overview of your activity</small>
             <div className={cssClasses.statsWrapper}>{cell.stats.map((stat) => <DisplayedProgress key={stat.name}
                                                                                                   stat={stat}/>)}</div>
         </>}
         {!cellMarked && <div className={cssClasses.inputWrapper}>
            {stats.map((stat, index) =>
               <ActivityInput key={stat.name} label={stat.name}
                              onChange={(value) => handleStatsChange(value, index)}
                              stat={stat}/>
            )}</div>}
      </div>
      <div className={cssClasses.buttons}>
         {!cellMarked ? <Button
               onClick={handleConfirm}>Confirm progress</Button> :
            <ConfirmButton className={cssClasses.button} barColor={"rgb(255, 100, 100)"} confirmTime={500}
                           onClick={onDeleteProgress}>Delete
               progress</ConfirmButton>}</div>

   </div>
}
