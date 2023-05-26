import {useContext} from "react";
import {ActivityAdderContext} from "../../ActivityAdderContext/ActivityAdderContext";
import {DisplayedField} from "../../Components/DisplayedField/DisplayedField";
import {Chip} from "@mui/material";
import {getClasses} from "../../../../utils/styleUtils";
import {styles} from "./styles";

const cssClasses = getClasses(styles);
export const Step3 = () => {
    const {activityName, selectedDays, defaultDays, stats} = useContext(ActivityAdderContext);
    return <div className={cssClasses.wrapper}>
        <strong>The following activity will be created</strong>
        <div><div className={cssClasses.title}>Activity name</div><Chip label={activityName} /> </div>
        <div><div  className={cssClasses.title}>Weekdays</div>{(selectedDays && selectedDays.length > 0 ? selectedDays : defaultDays)?.map((day) =>
            <Chip label={day} />)}</div>
        <div><div  className={cssClasses.title}>Stats</div>{stats?.map((stat) => <Chip sx={{height: 35, borderRadius: 35}} label={<div>{stat.name} <br/><small><i>{stat.preferedUnit}</i></small></div>} />)}
        </div>

    </div>
}