import {getClasses} from "../../utils/styleUtils";
import {useCallback} from "react";
import {wrapperStyles} from "./styles";
import {useAppDispatch} from "../../store/store";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../types/pages";
import {Activity} from "./Activitiy";
import {ActivityProps} from "../../store/activities/types";
import {setActiveActivity} from "../../store/activity/activityActions";
import {Button} from "../Button/Button";

const wrapperClasses = getClasses(wrapperStyles);
export const ActivityWrapper = ({
                                   currentValue,
                                   maxValue,
                                   name,
                                   index,
                                   level,
                                }: ActivityProps & { index: number }) => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const openActivity = useCallback(() => {
      dispatch(setActiveActivity(index));
      navigate(Pages.ACTIVITY);
   }, []);

   return (
      <Button className={wrapperClasses.activityWrapper} onClick={openActivity}>
         <div className={wrapperClasses.text}>{name}</div>
         <Activity
            currentValue={currentValue}
            maxValue={maxValue}
            level={level}
         />
      </Button>
   );
};
