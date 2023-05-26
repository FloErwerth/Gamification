import {style} from "../../../../utils/styleUtils";

export const styles = style({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
    },
    selectedStats: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        rowGap: 4,
        columnGap: 5,
    },outerWrapper: {
        height: 60,
    },
    daysWrapper: {
        display: "flex",
        flexDirection: "row",
        marginInline: "auto",
        marginTop: 15,
        gap: 5,
    }
})