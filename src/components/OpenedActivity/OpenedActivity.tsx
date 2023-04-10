import {DateType, StatsProps} from "../../store/activities/types";
import {Button} from "../basicComponents/Button/Button";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {useMemo} from "react";
import {ConfirmButton} from "../basicComponents/ConfirmButton/ConfirmButton";
import {TextArea} from "../basicComponents/TextArea/TextArea";
import {getDisplayDate} from "../calendar/utils";
import {Input} from "../basicComponents/Input/Input";

export type CellInfo =
   { date: DateType, marked?: boolean, progress?: number, info?: string, interactable?: boolean };

interface OpenedActivityProps {
   activity: StatsProps,
   onProgressChange: (value: string) => void,
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
                                  cellInfo,
                                  onInfoChange,
                                  onProgressChange,
                                  onIncreaseProgress,
                                  onDecreaseProgress
                               }: OpenedActivityProps) => {
   const showProgress = useMemo(() => getShowProgress(activity.type), [activity.type]);
   return <div className={cssClasses.wrapper}>
      <div className={cssClasses.title}>{activity.name} on {getDisplayDate(cellInfo?.date)}</div>
      <div>
         {cellInfo.marked && showProgress && <div>Progress: {cellInfo?.progress}</div>}
         {!cellInfo.marked && showProgress &&
             <Input label={"Type in your progress"} type={"number"} value={cellInfo?.progress}
                    onChange={onProgressChange}></Input>}
         <TextArea label={"Notes"} initialValue={cellInfo?.info} onChange={onInfoChange}/>
      </div>
      <div className={cssClasses.buttons}>
         {!cellInfo.marked && <Button
             onClick={onIncreaseProgress}>{activity.type === "Days" ? "Add one day to progress" : "Confirm progress"}</Button>}
         <ConfirmButton barColor={"rgb(255, 100, 100)"} confirmTime={500} onClick={onDecreaseProgress}>Delete
            progress</ConfirmButton></div>
   </div>
}
