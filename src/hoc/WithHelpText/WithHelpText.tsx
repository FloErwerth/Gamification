import {PropsWithChildren, useMemo} from "react";
import {InfoSharp} from "@mui/icons-material";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {IconButton, Tooltip, TooltipProps} from "@mui/material";

interface WithHelpTextProps extends PropsWithChildren {
   placement: TooltipProps["placement"]
   position: "start" | "end",
   helpText: string
   tooltipWidth?: number,
}


export function WithHelpText({tooltipWidth = 150, children, helpText, position, placement}: WithHelpTextProps) {
   const cssClasses = useMemo(() => getClasses(styles(tooltipWidth, position)), [position]);
   return <div className={cssClasses.wrapper}>
      {children}
      <div className={cssClasses.helpText}><Tooltip classes={{tooltip: cssClasses.tooltip}} title={helpText}
                                                    placement={placement}>
         <IconButton sx={{width: 22, height: 22}}>
            <InfoSharp sx={{width: 18, height: 18}}/>
         </IconButton>
      </Tooltip></div>
   </div>
}