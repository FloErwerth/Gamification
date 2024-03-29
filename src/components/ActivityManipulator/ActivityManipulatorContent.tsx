import {useCallback, useContext, useMemo} from "react";
import {getClasses} from "../../utils/styleUtils";
import {activityAdderClasses} from "./styles";
import {Button, Step, StepLabel, Stepper} from "@mui/material";
import {Step1} from "./Steps/Step1/Step1";
import {Step2} from "./Steps/Step2/Step2";
import {Step3} from "./Steps/Step3/Step3";
import {ActivityManipulatorContext} from "./ActivityManipulatorContext/ActivityManipulatorContext";
import {Modal} from "../../basicComponents/Modal/Modal";

const cssClasses = getClasses(activityAdderClasses);

const steps = [
   {label: "Name and Days", Component: Step1},
   {label: "Stats", Component: Step2},
   {label: "Check and confirm", Component: Step3},
];

export const ActivityManipulatorContent = () => {
   const {
      handleConfirmActivityEdit,
      withState,
      showAdder,
      setActiveStep,
      onCreation,
      activeStep,
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
         if (!withState) {
            onCreation?.();
         } else {
            handleConfirmActivityEdit?.();
         }
      }
   }, [withState, activeStep, setActiveStep]);

   const handlePreviousStep = useCallback(() => {
      setActiveStep?.((step) => step - 1);
   }, [setActiveStep]);

   const isNextStepButtonDisabled = useMemo(() => {
      if (activeStep === 0) {
         return !activityName;
      } else if (activeStep === 1) {
         return !stats || (stats && stats.length === 0);
      } else {
         return false;
      }
   }, [stats, activityName]);

   return <Modal open={showAdder ?? false} onClose={onClose}>
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
                  <Button disabled={isNextStepButtonDisabled} onClick={handleNextStep}>
                     {activeStep === 2 ? withState ? "Confirm edit" : "Create activity" : "Next step"}
                  </Button>
               </>
            )}
         </div>
      </div>
   </Modal>
};
