export const activityAdderClasses = {
   modalWrapper: {
      display: "grid",
      gridTemplateRows: "30px 440px 30px",
      padding: 20,
      width: 500,
      gap: 20,
   },
   addButtonWrapper: {
      marginTop: 10,
      display: "flex",
      justifyContent: "space-around",
   },
   addButton: {
      width: 40,
      height: 40,
   },
   addIcon: {
      width: 30,
      height: 30,
   },
   nameInput: {
      marginBottom: 10,
   },
   statsTitle: {
      paddingBlock: 15,
   },
   fieldsWrapper: {
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      padding: 10,
      gap: 5,
      overflowY: "auto",
      height: 250,
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