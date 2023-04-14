import {getClasses} from "../../utils/styleUtils";
import {landingPageStyles} from "./landingPageStyles";
import {Button} from "../../components/basicComponents/Button/Button";
import {ButtonThemeEnum} from "../../components/basicComponents/Button/types";
import {Card} from "../../components/basicComponents/Card/Card";
import {useState} from "react";
import {Modal} from "../../components/basicComponents/Modal/Modal";
import {AuthenticationForm} from "../../forms/Authentication/AuthenticationForm";

const cssClasses = getClasses(landingPageStyles);

export const LandingPage = () => {

   const [showAuth, setShowAuth] = useState(false);

   return <>
      <div className={cssClasses.wrapper}>
         <h2 className={cssClasses.title}>Transform your life into an exciting
            <div className={cssClasses.game}>game.</div>
         </h2>
         <div className={cssClasses.wrapper}>
            <div className={cssClasses.text}>Gamify helps you define your goals and keep track of the progress. Earn
               rewards
               and share them with
               other users and your friends.
            </div>
            <Button theme={ButtonThemeEnum.CTA} onClick={() => setShowAuth(true)} className={cssClasses.button}>GAME
               ON</Button>
         </div>
         <div className={cssClasses.grid3}>
            <Card title={"DEFINE GOALS"} expandedContent={<div>You can chose from</div>}>
               Gamify offers many options to define goals and create activities from them.
            </Card>
            <Card title={"KEEP TRACK"}>
               Keep track of your progress using your created activity and gain XP, badges and more.
            </Card>
            <Card title={"SHARE"}>Share your progress and badges with your friends and family.</Card>
         </div>

         <div className={cssClasses.section1}/>
      </div>
      {showAuth && <Modal open={showAuth} onClose={() => setShowAuth(false)}><AuthenticationForm
          forcedMode={"REGISTER"}/></Modal>}</>
}