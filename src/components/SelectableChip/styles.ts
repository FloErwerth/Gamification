export const styles = (selected: boolean) => {
   return {
      backgroundColor: selected ? "lightblue" : "",
      transition: "outline-color 200ms",
      outline: "0.5px solid transparent",

      ":hover": {
         outlineColor: "rgba(200,200,200,0.7)",
         backgroundColor: selected ? "lightblue" : "",
      }
   }
}