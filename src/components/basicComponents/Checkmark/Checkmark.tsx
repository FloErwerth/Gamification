import { useCallback } from "react";
import { getClasses } from "../../../utils/styleUtils";
import { useToggle } from "../../../utils/useToggle";
import { Button } from "../Button/Button";
import { styles } from "./styles";
import { Checkmark as CheckmarkIcon } from "../../../media/icons";
import { useAppSelector } from "../../../store/store";
import { getStayLoggedIn } from "../../../store/authentication/authSelectors";

const cssClasses = getClasses(styles);

interface CheckmarkProps {
  onToggle?: (value: boolean) => void;
  label?: string;
}

export const Checkmark = ({ onToggle, label }: CheckmarkProps) => {
  const isStayLoggedIn = useAppSelector(getStayLoggedIn);
  const { value, toggleValue } = useToggle(isStayLoggedIn ?? false);
  const handleToggle = useCallback(() => {
    toggleValue();
    onToggle?.(value);
  }, [onToggle, value]);

  return (
    <Button className={cssClasses.button} onClick={handleToggle}>
      <div className={cssClasses.icon}>
        {value && <CheckmarkIcon className={cssClasses.checkmark} />}
      </div>
      <div className={cssClasses.label}>{label}</div>
    </Button>
  );
};
