import {style} from "../../utils/styleUtils";

export const styles = (width: string) => {
   return {
      bar: {
         zIndex: 1,
         backgroundColor: "white",
         userSelect: "none",
         position: "relative",
         outline: "3px solid black",
         width: 200,
         height: 40,
         borderRadius: 5,
         "::after": {
            content: '""',
            display: "block",
            width,
            height: 40,
            transition: "width 600ms",
            backgroundColor: "green",
         }
      },
      barWrapper: {
         display: "flex",
         flexDirection: "row",
         gap: 10,
         alignItems: "center",
      },
      xp: {
         position: "absolute",
         left: "50%", top: "50%",
         transform: "translate(-50%, -50%)",
      },
      star: {
         position: "absolute",
         height: 40,
         width: 40,
      },
      levelWrapper: {
         width: 40,
         height: 40,
         position: "relative",
         top: -0,
      },
      level: {
         position: "absolute",
         top: 12,
         left: 0,
         width: 40,
         height: 40,
         fontSize: 14,
         textAlign: "center",
      }
   } as const;
}

export const wrapperStyles = style({
   activityWrapper: {
      textAlign: "left",
      padding: "5px 7px 10px 15px",
      ":hover": {
         filter: "none",
         backgroundColor: "rgb(235,235,255)",
      }
   },
   text: {
      marginBottom: 5,
   }
})