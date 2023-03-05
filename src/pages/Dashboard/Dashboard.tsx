import { useNavigate } from "react-router-dom";
import { Button } from "../../components/basicComponents/Button/Button";
import { getLoginData } from "../../store/authentication/authSelectors";
import { useAppSelector } from "../../store/store";
import { Pages } from "../../types/pages";

export const Dashboard = () => {
  const userData = useAppSelector(getLoginData);
  const navigate = useNavigate();
  return (
    <div>
      <div>{userData.email}</div>
      <Button onClick={() => navigate(Pages.OVERVIEW)}>
        Return to overview
      </Button>
    </div>
  );
};
