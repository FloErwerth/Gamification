export const activityAdderClasses = {
   modalWrapper: {
      display: "grid",
      gridTemplateRows: "30px 440px 30px",
      padding: 20,
      gap: 20,
      minHeight: 500,
      width: 300,
   },
   adder: {
      padding: 15,
      width: 150,
   },
   nameInput: {
      marginBottom: 10,
   },
   statsTitle: {
      paddingBlock: 15,
   },
   addButton: {
      marginBlock: 10,
      marginInline: "auto",
   },
   fieldsWrapper: {
      marginTop: 10,
      display: "flex",
      flexDirection: "column",
      gap: 5,
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