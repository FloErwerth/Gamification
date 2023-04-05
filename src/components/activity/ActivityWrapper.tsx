import {getClasses} from "../../utils/styleUtils";
import {useCallback} from "react";
import {wrapperStyles} from "./styles";
import {Button} from "../basicComponents/Button/Button";
import {useAppDispatch} from "../../store/store";
import {setActiveActivity} from "../../store/activity/activityActions";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../types/pages";
import {Activity} from "./Activitiy";
import {StatsProps} from "./types";


//TODO: implement type


const wrapperClasses = getClasses(wrapperStyles);
export const ActivityWrapper = ({
                                   currentValue,
                                   maxValue,
                                   name,
                                   increasement,
                                   index,
                                   level,
                                   type,
                                }: StatsProps & { index: number }) => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const openActivity = useCallback(() => {
      dispatch(setActiveActivity(index));
      navigate(Pages.ACTIVITY);
   }, []);

   return (
      <Button className={wrapperClasses.activityWrapper} onClick={openActivity}>
         {name}
         <Activity
            currentValue={currentValue}
            maxValue={maxValue}
            increasement={increasement}
            level={level}
            type={type}
         />
      </Button>
   );
};
