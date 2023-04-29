import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {PropsWithChildren} from "react";
import {Card as MuiCard, CardContent, CardHeader} from "@mui/material";

const cssClasses = getClasses(styles);

interface ICardProps extends PropsWithChildren {
   title: string;
}

export const Card = ({children, title}: ICardProps) => {
   return <MuiCard className={cssClasses.card}>
      <CardHeader className={cssClasses.cardHeader} title={title}/>
      <CardContent className={cssClasses.cardBody}>{children}</CardContent>
   </MuiCard>
}