export const statStyles = (width: string) => {
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
         position: "relative",
         top: -3,
         height: 60,
         width: 60,
      },
      levelWrapper: {
         position: "relative",
      },
      level: {
         position: "absolute",
         top: 21,
         left: 26.5
      }
   } as const;
}