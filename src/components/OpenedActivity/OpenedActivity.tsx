import {DateType, StatsProps} from "../../store/activities/types";
import {Button} from "../basicComponents/Button/Button";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {useMemo} from "react";
import {ConfirmButton} from "../basicComponents/ConfirmButton/ConfirmButton";
import {TextArea} from "../basicComponents/TextArea/TextArea";

export type CellInfo =
   { date: DateType, marked?: boolean, progress?: number, info?: string, interactable?: boolean };

interface OpenedActivityProps {
   activity: StatsProps,
   progress: number,
   onProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
   onIncreaseProgress: () => void;
   onDecreaseProgress: () => void;
   onInfoChange?: (info: string) => void;
   cellInfo: CellInfo,
}

const cssClasses = getClasses(styles);

const getShowProgress = (type: StatsProps["type"]) => {
   return type !== "Days";
}

export const OpenedActivity = ({
                                  activity,
                                  progress,
                                  cellInfo,
                                  onInfoChange,
                                  onProgressChange,
                                  onIncreaseProgress,
                                  onDecreaseProgress
                               }: OpenedActivityProps) => {
   const showProgress = useMemo(() => getShowProgress(activity.type), [activity.type]);
   return <div className={cssClasses.wrapper}>
      <div className={cssClasses.title}>{activity.name} on {cellInfo?.date}</div>
      <div>
         {showProgress && <div>Progress: {cellInfo?.progress}</div>}
         {showProgress &&
             <input type={"text"} value={progress} onChange={onProgressChange}></input>}
         <TextArea label={"Notes"} initialValue={cellInfo?.info} onChange={onInfoChange}/>
      </div>
      <div className={cssClasses.buttons}>
         {!cellInfo.marked && <Button
             onClick={onIncreaseProgress}>{activity.type === "Days" ? "Add one day to progress" : "Confirm progress"}</Button>}
         <ConfirmButton barColor={"rgb(255, 100, 100)"} confirmTime={500} onClick={onDecreaseProgress}>Delete
            progress</ConfirmButton></div>
   </div>
}
