import {DateType, StatsProps} from "../../store/activities/types";
import {Button} from "../basicComponents/Button/Button";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";

export type CellInfo = { date: DateType, marked: boolean, progress?: number } | undefined;

interface OpenedActivityProps {
   activity: StatsProps,
   progress: number,
   onProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
   onIncreaseProgress: () => void;
   onDecreaseProgress: () => void;
   cellInfo: CellInfo,
}

const cssClasses = getClasses(styles);

export const OpenedActivity = ({
                                  activity,
                                  progress,
                                  cellInfo,
                                  onProgressChange,
                                  onIncreaseProgress,
                                  onDecreaseProgress
                               }: OpenedActivityProps) => {
   return <div className={cssClasses.wrapper}>
      <div className={cssClasses.title}></div>
      {activity.type !== "Days" && <div>Progress: {cellInfo?.progress}</div>}
      {activity.type !== "Days" &&
          <input type={"text"} value={progress} onChange={onProgressChange}></input>}
      <Button
         onClick={onIncreaseProgress}>{activity.type === "Days" ? "Add one day to progress" : "Confirm progress"}</Button>
      <Button onClick={onDecreaseProgress}>Delete progress</Button>
   </div>
}
