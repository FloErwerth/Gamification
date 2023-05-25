import {getClasses} from "../../utils/styleUtils";
import {useCallback} from "react";
import {wrapperStyles} from "./styles";
import {useAppDispatch} from "../../store/store";
import {useNavigate} from "react-router-dom";
import {Pages} from "../../types/pages";
import {ActivityProps} from "../../store/activities/types";
import {setActiveActivity} from "../../store/activeActivity/activityActions";
import {ClickableCard} from "../../basicComponents/Card/Card";

const wrapperClasses = getClasses(wrapperStyles);
export const ActivityWrapper = ({
                                   name,
                                   index,
                                   stats,
                                }: ActivityProps & { index: number }) => {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const openActivity = useCallback(() => {
      dispatch(setActiveActivity(index));
      navigate(Pages.ACTIVITY);
   }, []);

   return <ClickableCard titleFontSize={15} title={name} onClick={openActivity} />
};
