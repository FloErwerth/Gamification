import {style} from "../../utils/styleUtils";

export const styles = style({
   card: {
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
      transition: '0.3s',
      borderRadius: '5px',
      backgroundColor: 'rgb(200,200,200)',
      margin: 'auto',
      width: "100%",
   },
   cardHeader: {
      backgroundColor: 'rgb(200,200,200)',
      padding: '10px',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
   },
   cardBody: {
      padding: '10px',
      fontSize: 12,
   },
   cardTitle: {
      marginTop: '0',
   },
})