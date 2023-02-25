import {getClasses} from "../../utils/styleUtils";
import {stepsStyles, stepStyle} from "./stepsStyles";
import {useMemo} from "react";
import {cx} from "@emotion/css";


interface StepsProps {
   currentStep: number;
   numberOfSteps: number;
}

interface StepProps {
   number: number,
   isCurrentStep: boolean,
   isPreviousStep: boolean,

}

const stepClasses = getClasses(stepStyle);
const Step = ({number, isCurrentStep, isPreviousStep}: StepProps) => {
   const classses = useMemo(() => cx(stepClasses.step, {
      [stepClasses.activeStep]: isCurrentStep,
      [stepClasses.previousStep]: isPreviousStep
   }), [isCurrentStep, isPreviousStep]);
   return <div className={classses}>{number}</div>
}

export const Steps = ({currentStep, numberOfSteps}: StepsProps) => {
   const cssClasses = useMemo(() => getClasses(stepsStyles((100 / (numberOfSteps - 1)) * (currentStep - 1))), [currentStep]);
   return <div className={cssClasses.wrapper}>{Array(numberOfSteps).fill("").map((_, index) => {
      return <Step number={index + 1} isCurrentStep={index + 1 === currentStep}
                   isPreviousStep={index + 1 < currentStep}/>
   })}</div>
}