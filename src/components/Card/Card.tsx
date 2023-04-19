import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {PropsWithChildren, ReactNode} from "react";

const cssClasses = getClasses(styles);

interface ICardProps extends PropsWithChildren {
   title: string;
   expandedContent?: ReactNode;
}

export const Card = ({children, title, expandedContent}: ICardProps) => {
   return <article className={cssClasses.card}>
      <header className={cssClasses.cardHeader}>
         <div>{title}</div>
      </header>
      <div className={cssClasses.cardBody}>
         <p>{children}</p>
      </div>
   </article>
}