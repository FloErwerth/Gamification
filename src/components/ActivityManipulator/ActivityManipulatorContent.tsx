import {useCallback, useContext, useMemo} from "react";
import {Modal} from "../../basicComponents/Modal/Modal";
import {getClasses} from "../../utils/styleUtils";
import {activityAdderClasses} from "./styles";
import {Button, Step, StepLabel, Stepper} from "@mui/material";
import {Step1} from "./Steps/Step1/Step1";
import {Step2} from "./Steps/Step2/Step2";
import {Step3} from "./Steps/Step3/Step3";
import {ActivityManipulatorContext} from "./ActivityManipulatorContext/ActivityManipulatorContext";

const cssClasses = getClasses(activityAdderClasses);

const steps = [
   {label: "Name and Days", Component: Step1},
   {label: "Stats", Component: Step2},
   {label: "Check and confirm", Component: Step3},
];
export const ActivityManipulatorContent = () => {
   const {
      showAdder,
      setActiveStep,
      onCreation,
      activeStep,
      setShowAdder,
      activityName,
      handleConfirmEdit,
      handleCancelEdit,
      editStat,
      stats,
      onClose,
   } = useContext(ActivityManipulatorContext);

   const handleNextStep = useCallback(() => {
      if ((activeStep ?? 0) < 2) {
         setActiveStep?.((step) => step + 1);
      } else if (activeStep === 2) {
         onCreation?.();
      }
   }, [activeStep, setActiveStep]);

   const handlePreviousStep = useCallback(() => {
      setActiveStep?.((step) => step - 1);
   }, [setActiveStep]);

   const disabled = useMemo(() => {
      if (activeStep === 0) {
         return !activityName;
      } else if (activeStep === 1) {
         return !stats || (stats && stats.length === 0);
      } else {
         return false;
      }
   }, [stats, activityName]);

   return (
      <>
         <Button
            className={cssClasses.addButton}
            onClick={() => setShowAdder?.(true)}
         >
            Add Activity
         </Button>
         {showAdder && (
            <Modal open={showAdder} onClose={onClose}>
               <div className={cssClasses.modalWrapper}>
                  <Stepper activeStep={activeStep} alternativeLabel>
                     {steps.map(({label}) => (
                        <Step>
                           <StepLabel>{label}</StepLabel>
                        </Step>
                     ))}
                  </Stepper>
                  <>
                     {steps.map(({Component}, index) => {
                        return index === activeStep && <Component/>;
                     })}
                  </>
                  <div className={cssClasses.buttons}>
                     {editStat ? (
                        <>
                           <Button onClick={handleCancelEdit}>Cancel edit</Button>
                           <Button onClick={handleConfirmEdit}>Confirm edit</Button>
                        </>
                     ) : (
                        <>
                           {activeStep && activeStep > 0 ? (
                              <Button onClick={handlePreviousStep}>Previous step</Button>
                           ) : (
                              <div></div>
                           )}
                           <Button disabled={disabled} onClick={handleNextStep}>
                              {activeStep === 2 ? "Create activity" : "Next step"}
                           </Button>
                        </>
                     )}
                  </div>
               </div>
            </Modal>
         )}
      </>
   );
};
