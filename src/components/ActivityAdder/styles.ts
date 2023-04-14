export const activityAdderClasses = {
   modalWrapper: {
      display: "grid",
      gridTemplateRows: "30px 440px 30px",
      padding: 20,
      gap: 20,
      minHeight: 500,
   },
   adder: {
      padding: 15,
      width: 150,
   },
   inputWrapper: {
      display: "flex",
      gap: 10,
   },
   input: {
      borderRadius: 6,
      backgroundColor: "lightgrey",
   },
} as const;