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
            <div className={cssClasses.underscore}>game.</div>
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
         <div className={cssClasses.section2}>
            <div className={cssClasses.title}>Unlock your full potential with <div
               className={cssClasses.underscore}>gamification.</div></div>
            <br/>
            <br/>
            <br/>
            <div className={cssClasses.text}>The goal of
               gamification is to make complex tasks or learning content more entertaining and accessible,
               encouraging
               participants to actively engage and succeed.
            </div>
            <div className={cssClasses.grid2}>
               <div><h3><i>XP</i></h3>Earn experience with every progress you make. This experience is then transfered
                  to your overall experience.
               </div>
               <div><h3>Badges</h3> Every activity comes with own badges. Also your experience level unlocks badges.
               </div>
               <div><h3>Sharing</h3>You can share your badges, experience from an activity or several other things to
                  showcase your progress.
               </div>
               <div><h3>Leaderboards</h3>A main driver of motivation is competition. Compete with your score on
                  leaderboards with selected friends or among all users.
               </div>
            </div>

         </div>
         <div className={cssClasses.background1}/>
         <div className={cssClasses.background2}/>
      </div>
      {showAuth && <Modal open={showAuth} onClose={() => setShowAuth(false)}><AuthenticationForm
          forcedMode={"REGISTER"}/></Modal>}</>
}