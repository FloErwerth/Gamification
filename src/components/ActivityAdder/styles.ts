export const activityAdderClasses = {
   modalWrapper: {
      display: "grid",
      gridTemplateRows: "30px 440px 30px",
      padding: 20,
      width: 500,
      gap: 20,
   },
   buttons: {
      marginTop: 10,
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
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
      flexWrap: "wrap",
      padding: 10,
      gap: 5,
      overflowY: "auto",
   },
   fieldsOuterWrapper: {
      height: 200,
      overflowY: "auto",
   },
   fieldsContainer: {
      display: "grid",
      gridTemplateRows: "30px 300px 30px",
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