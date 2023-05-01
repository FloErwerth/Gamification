import {BadgeType} from "../../store/badges/types";
import {Paper} from "@mui/material";

export const Badge = ({title, SVG}: BadgeType) => {
   return <Paper
      sx={{width: "fit-content", display: "flex", flexDirection: "column", alignItems: "center", padding: 1}}
      elevation={0}><SVG
      style={{width: 100, height: 100}}/>
      <div>{title}</div>
   </Paper>;
}