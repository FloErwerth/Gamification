export const activityAdderClasses = {
   modalWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
   },
   adder: {
      padding: 15,
      width: 150,
      ":hover": {backgroundColor: "rgb(150,200,200)"}
   },
   input: {
      borderRadius: 6,
      backgroundColor: "lightgrey",
      ":focus-within": {
         backgroundColor: "lightgrey",
      }
   },
} as const;