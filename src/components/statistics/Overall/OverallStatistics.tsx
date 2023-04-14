import {getClasses} from "../../../utils/styleUtils";
import {styles} from "./styles";
import {Button} from "../../basicComponents/Button/Button";
import {useState} from "react";
import {StatisticsFilter} from "./types";


const cssClasses = getClasses(styles);
export const OverallStatistics = () => {
   const [chosenFilter, setChosenFilter] = useState<StatisticsFilter>()
   return <div className={cssClasses.wrapper}>
      <div>{chosenFilter}</div>
      <div className={cssClasses.filterButtons}>
         {StatisticsFilter.options.map((option) => <Button
            onClick={() => setChosenFilter(option)}>{option}</Button>)}</div>
   </div>
}