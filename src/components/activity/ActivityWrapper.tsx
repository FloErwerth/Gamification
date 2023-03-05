import { getClasses } from "../../utils/styleUtils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { styles, wrapperStyles } from "./styles";
import { Star } from "../../media/icons";
import { ActivityIncrease, ActivityType } from "../../store/activities/types";
import { Button } from "../basicComponents/Button/Button";
import { useAppDispatch } from "../../store/store";
import { setActiveActivity } from "../../store/activity/activityActions";
import { useNavigate } from "react-router-dom";
import { Pages } from "../../types/pages";
import { Activity } from "./Activitiy";

//TODO: implement type
export type StatsProps = {
  currentValue: number;
  maxValue: number;
  name: string;
  level: number;
  type: ActivityType;
  increasement: ActivityIncrease;
};

const useNumberIncreaser = (currentXP: number) => {
  const [localXP, setLocalXP] = useState(currentXP);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [speed, setSpeed] = useState(0);

  const animateNumber = useCallback(
    (currentNumber: number) => {
      if (currentNumber === currentXP) {
        setAnimationTriggered(false);
        return;
      }
      setLocalXP(currentNumber + 1);
      setTimeout(() => animateNumber(currentNumber + 1), speed);
    },
    [localXP, currentXP, speed]
  );

  useEffect(() => {
    if (localXP === currentXP) {
      setSpeed(0);
      return;
    }
    if (localXP !== currentXP && !animationTriggered) {
      setAnimationTriggered(true);
      setSpeed(300 / (currentXP - localXP));
      animateNumber(localXP);
    }
  }, [localXP, currentXP, animationTriggered]);
  return [localXP];
};

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
