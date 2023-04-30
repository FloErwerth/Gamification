import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {PropsWithChildren} from "react";
import {
   Card as MuiCard,
   CardActionArea,
   CardContent,
   CardHeader as MuiCardHeader,
   CardHeaderProps
} from "@mui/material";

const cssClasses = getClasses(styles);

interface ICardProps extends PropsWithChildren {
   titleFontSize?: number | string
   title: string;
}

interface ICardClickableProps extends ICardProps {
   onClick: () => void
}

const CardHeader = (props: CardHeaderProps & { fontSize?: number | string }) => {
   return <MuiCardHeader titleTypographyProps={{fontSize: props.fontSize, textAlign: "center"}} {...props} />
}

export const Card = ({children, title, titleFontSize = "large"}: ICardProps) => {
   return <MuiCard className={cssClasses.card}>
      <CardHeader fontSize={titleFontSize} className={cssClasses.cardHeader} title={title}/>
      <CardContent className={cssClasses.cardBody}>{children}</CardContent>
   </MuiCard>
}

export const ClickableCard = ({children, title, onClick, titleFontSize = "large"}: ICardClickableProps) => {
   return <MuiCard className={cssClasses.card}>
      <CardActionArea onClick={onClick}>
         <CardHeader fontSize={titleFontSize} className={cssClasses.cardHeader} title={title}/>
         {children && <CardContent className={cssClasses.cardBody}>{children}</CardContent>}
      </CardActionArea>
   </MuiCard>
}