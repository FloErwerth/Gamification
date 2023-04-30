import {BreakpointOverrides, Grid} from "@mui/material"
import {PropsWithChildren} from "react";

interface IGridItem extends PropsWithChildren {
   breakpoint: BreakpointOverrides
}

export const GridItem = ({children, breakpoint}: IGridItem) => {
   return <Grid {...breakpoint} item>{children}</Grid>
}