import {style} from "../../../../utils/styleUtils";

export const styles = style({
    selectorWrapper: {
        display: "flex",
        flexDirection: "column",
    },
    buttons: {
        display: "flex",
        gap: 15,
    },
    selectedStatsWrapper: {
        height: 150,
      marginTop: 20,
    },
    info: {
        marginTop: 5,
    },
    selectedStats: {
        padding: 3,
        marginBlock: 5,
        overflow: "auto",
        height: "calc(100% - 20px)",
        display: "flex",
        flexWrap: "wrap",
        placeContent: "flex-start",
        justifyContent: "flex-start",
        rowGap: 4,
        columnGap: 5,
    },
})