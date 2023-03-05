import { useMemo } from "react";
import { getClasses } from "../../utils/styleUtils";
import { StatsProps } from "./ActivityWrapper";
import { styles } from "./styles";
import { Star } from "../../media/icons";
import { type } from "os";

type ActivityProps = Omit<StatsProps, "name" | "width">;
export const Activity = ({
  currentValue,
  maxValue,
  type,
  level,
}: ActivityProps) => {
  const cssClasses = useMemo(
    () =>
      getClasses(
        styles(((currentValue * 100) / maxValue).toString().concat("%"))
      ),
    []
  );
  return (
    <div className={cssClasses.barWrapper}>
      <div className={cssClasses.bar}>
        <div className={cssClasses.xp}>
          {currentValue}/{maxValue} {type}
        </div>
      </div>
      <div className={cssClasses.levelWrapper}>
        <Star className={cssClasses.star} />
        <div className={cssClasses.level}>{level}</div>
      </div>
    </div>
  );
};
