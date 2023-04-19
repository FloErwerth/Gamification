import {ActivityProps, DateType} from "../../store/activities/types";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {TextArea} from "../TextArea/TextArea";
import {getGeneratedDisplayDate} from "../calendar/utils";
import {Input} from "../Input/Input";
import {useCallback, useState} from "react";
import produce from "immer";
import {Stat} from "../../store/activities/predefinedActivities";
import {DisplayedStat} from "../DisplayedStat/DisplayedStat";
import {Button} from "../Button/Button";
import {ConfirmButton} from "../ConfirmButton/ConfirmButton";

export type CellInfo =
   { date: DateType, marked?: boolean, stats?: Stat[], info?: string, interactable?: boolean };

interface OpenedActivityProps {
   activity: ActivityProps,
   onConfirmProgress: (stats: Stat[]) => void;
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

   const handleStatsChange = useCallback((value: string, index: number) => {
      if (value && !cellInfo.marked) {
         setStats((old) => produce(old, newStats => {
            newStats[index].value = parseFloat(value);
         }));
      }
   }, [stats]);

   return <div className={cssClasses.wrapper}>
      <div className={cssClasses.title}>{activity.name} on {getGeneratedDisplayDate(cellInfo?.date)}</div>
      <div>
         {!cellInfo.marked &&
             <div className={cssClasses.statsWrapper}>
                {stats.map((stat, index) => <Input placeholder={"0"} label={stat.name}
                                                   onChange={(value) => handleStatsChange(value, index)}
                                                   type={"number"}/>)}</div>
         }
         {cellInfo.marked && cellInfo.stats &&
             <>
                 <small>Here is the overview of your activity</small>
                 <div className={cssClasses.statsWrapper}>{cellInfo.stats.map((stat) => <DisplayedStat
                    stat={stat}/>)}</div>
             </>}
         <TextArea label={"Notes"} initialValue={cellInfo?.info} onChange={onInfoChange}/>
      </div>
      <div className={cssClasses.buttons}>
         {!cellInfo.marked && <Button
             onClick={() => onConfirmProgress(stats)}>Confirm progress</Button>}
         <ConfirmButton barColor={"rgb(255, 100, 100)"} confirmTime={500} onClick={onDeleteProgress}>Delete
            progress</ConfirmButton></div>
   </div>
}
