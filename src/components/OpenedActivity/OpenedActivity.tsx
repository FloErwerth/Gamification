import {ActivityProps, DateType} from "../../store/activities/types";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {TextArea} from "../TextArea/TextArea";
import {getGeneratedDisplayDate} from "../calendar/utils";
import {Input} from "../Input/Input";
import {useCallback, useMemo, useState} from "react";
import produce from "immer";
import {DisplayedStat} from "../DisplayedStat/DisplayedStat";
import {Button} from "../Button/Button";
import {ConfirmButton} from "../ConfirmButton/ConfirmButton";
import {useAppSelector} from "../../store/store";
import {getCell} from "../../store/activities/activitiesSelectors";
import {StatWithValue} from "../../activitiesAssembly/stats";

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
                                  onInfoChange,
                                  onConfirmProgress,
                                  onDeleteProgress
                               }: OpenedActivityProps) => {

   const cell = useAppSelector(getCell(activeActivity.index, date));
   const cellMarked = useMemo(() => cell && cell.marked, [cell]);
   const [stats, setStats] = useState<StatWithValue[]>(activeActivity.activity.stats.map((stat) => {
      return {name: stat, value: 0}
   }));

   const handleStatsChange = useCallback((value: string, index: number) => {
      if (value && !cellMarked) {
         setStats((old) => produce(old, newStats => {
            newStats[index].value = parseFloat(value);
         }));
      }
   }, [stats]);

   return <div className={cssClasses.wrapper}>
      <div className={cssClasses.title}>{getGeneratedDisplayDate(date)}</div>
      <div>
         {cellMarked && cell.stats && <>
             <small>Here is the overview of your activity</small>
             <div className={cssClasses.statsWrapper}>{cell.stats.map((stat) => <DisplayedStat key={stat.name}
                                                                                               stat={stat}/>)}</div>
         </>
         }
         {!cellMarked && <div className={cssClasses.statsWrapper}>
            {stats.map((stat, index) =>
               <Input key={stat.name} placeholder={"0"} label={stat.name}
                      onChange={(value) => handleStatsChange(value, index)}
                      type={"number"}/>
            )}</div>
         }
         <TextArea label={"Notes"} initialValue={cell?.info} onChange={onInfoChange}/>
      </div>
      <div className={cssClasses.buttons}>
         {!cellMarked && <Button
             onClick={() => onConfirmProgress(stats)}>Confirm progress</Button>}
         <ConfirmButton barColor={"rgb(255, 100, 100)"} confirmTime={500} onClick={onDeleteProgress}>Delete
            progress</ConfirmButton></div>
   </div>
}
