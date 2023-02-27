export const activityAdderClasses = {
   modalWrapper: {
      display: "grid",
      gridTemplateRows: "30px 65px 245px 40px",
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