import { style } from "../../../utils/styleUtils"
export const styles = style({
    checkmark: {
        position: "relative",
    },
    icon: {
        width: 20,
        height: 20,
        borderRadius: 20,

        outline: "1px solid black",
    },
    label: {
        fontSize: 14,
    },
    button: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderRadius: 20,
        padding: 5,
    }
})