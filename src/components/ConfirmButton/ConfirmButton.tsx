import {ButtonProps} from "../Button/Button";
import {useEffect, useMemo, useRef, useState} from "react";
import {getClasses} from "../../utils/styleUtils";
import {styles} from "./styles";
import {cx} from "@emotion/css";

const intervalTime = 10;

interface ConfirmButtonProps extends ButtonProps {
   barColor?: string;
   textColor?: string;
   backgroundColor?: string;
   hoverColor?: string;
   confirmTime?: number;
   className?: string;
}

export const ConfirmButton = ({
                                 onClick,
                                 children,
                                 barColor = "black",
                                 textColor = "black",
                                 backgroundColor = "white",
                                 hoverColor = "lightgray",
                                 confirmTime = 1000,
                                 className
                              }: ConfirmButtonProps) => {

   const [timeProgess, setTimeProgress] = useState(0);
   const buttonRef = useRef<HTMLButtonElement>(null);
   const [counterStarted, setStartCounter] = useState(false);
   const cssClasses = useMemo(() => getClasses(styles((timeProgess / confirmTime) * 100, barColor, textColor, backgroundColor, hoverColor)), [timeProgess]);
   const buttonClasses = useMemo(() => cx(cssClasses.button, className), [cssClasses, className]);
   const [interval, setIntervalFunction] = useState<NodeJS.Timer | undefined>(undefined);

   useEffect(() => {
      if (counterStarted) {
         if (!interval) {
            setIntervalFunction(
               setInterval(() => {
                  setTimeProgress((cur) => cur + intervalTime)
               }, intervalTime)
            )
         }
         if (timeProgess >= confirmTime) {
            onClick?.();
            clearInterval(interval);
            setIntervalFunction(undefined);
            setStartCounter(false);
            setTimeProgress(0);
         }
      } else {
         clearInterval(interval);
         setIntervalFunction(undefined);
         setTimeProgress(0);
      }
   }, [counterStarted, timeProgess])

   useEffect(() => {
      buttonRef.current?.addEventListener("mousedown", () => setStartCounter(true));
      buttonRef.current?.addEventListener("mouseup", () => setStartCounter(false));
      return () => {
         buttonRef.current?.removeEventListener("mousedown", () => setStartCounter(true));
         buttonRef.current?.removeEventListener("mouseup", () => setStartCounter(false));
      }
   }, []);

   return <button className={buttonClasses} ref={buttonRef}>
      <div className={cssClasses.buttonContent}>{children}</div>
   </button>
}