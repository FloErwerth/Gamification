import {ActivityProps, DateType} from "../../store/activities/types";
import {Button} from "../basicComponents/Button/Button";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {ConfirmButton} from "../basicComponents/ConfirmButton/ConfirmButton";
import {TextArea} from "../basicComponents/TextArea/TextArea";
import {getGeneratedDisplayDate} from "../calendar/utils";
import {Input} from "../basicComponents/Input/Input";
import {useCallback, useState} from "react";
import produce from "immer";

export type CellInfo =
   { date: DateType, marked?: boolean, progress?: number, info?: string, interactable?: boolean };

interface OpenedActivityProps {
   activity: ActivityProps,
   onConfirmProgress: () => void;
   onDeleteProgress: () => void;
   onInfoChange?: (info: string) => void;
   cellInfo: CellInfo,
}

const cssClasses = getClasses(styles);

export const OpenedActivity = ({
                                  activity,
                                  cellInfo,
                                  onInfoChange,
                                  onConfirmProgress,
                                  onDeleteProgress
                               }: OpenedActivityProps) => {
   const [stats, setStats] = useState(activity.stats);

   const handleStatsChange = useCallback((value: number, index: number) => {
      setStats((old) => produce(old, newStats => {
         newStats[index].value = value;
      }));
   }, [stats]);

   return <div className={cssClasses.wrapper}>
      <div className={cssClasses.title}>{activity.name} on {getGeneratedDisplayDate(cellInfo?.date)}</div>
      <div>
         {cellInfo.marked && <div>Progress: {cellInfo?.progress}</div>}
         {!cellInfo.marked &&
             <div className={cssClasses.statsWrapper}>
                {stats.map((stat, index) => <Input placeholder={"0"} label={stat.name}
                                                   onChange={(value) => handleStatsChange(value, index)}
                                                   type={"number"} value={stat.value}/>)}</div>
         }
         <TextArea label={"Notes"} initialValue={cellInfo?.info} onChange={onInfoChange}/>
      </div>
      <div className={cssClasses.buttons}>
         {!cellInfo.marked && <Button
             onClick={onConfirmProgress}>Confirm progress</Button>}
         <ConfirmButton barColor={"rgb(255, 100, 100)"} confirmTime={500} onClick={onDeleteProgress}>Delete
            progress</ConfirmButton></div>
   </div>
}
