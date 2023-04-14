export const overStyles = {
   statsWrapper: {
      display: "grid",
      gridTemplateColumns: "calc(33% - 3.342px) calc(33% - 3.342px) calc(33% - 3.342px)",
      gap: 10,
      marginBlock: 50,
   },
   headerWrapper: {
      display: "flex",
      justifyContent: "space-between",
   },
   activityAdderWrapper: {
      width: "100%", display: "flex",
      justifyContent: "center",
   }
} as const;