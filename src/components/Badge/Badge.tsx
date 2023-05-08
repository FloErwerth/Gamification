import {BadgeType} from "../../store/badges/types";
import {styles} from "./styles";
import {useMemo} from "react";
import {Paper} from "@mui/material";

interface IBadge extends Partial<BadgeType> {
   earned?: boolean;
}

export const Badge = ({title, description, BadgeSVG, earned}: IBadge) => {
   const badgeStyles = useMemo(() => {
      return {...styles.badge, filter: earned ? "" : "saturate(0.1) brightness(0.5)"}
   }, [earned])

   return <Paper elevation={2}
                 style={{
                    width: 175,
                    padding: "0px 10px 10px 10px",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                    alignItems: "center"
                 }}>{BadgeSVG &&
       <BadgeSVG
           style={badgeStyles}/>}
      <div>
         <strong>{title}</strong>
         <div>{description}</div>
      </div>
   </Paper>;
}