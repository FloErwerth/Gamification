import {Badge} from "../Badge/Badge";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getSortedBadges} from "../../store/badges/badgesSelector";
import {BadgeMap, BadgeSignature} from "../../store/badges/types";
import {Paper} from "@mui/material";
import {useEffectOnce} from "usehooks-ts";
import {generateAction} from "../../store/utils";
import {BadgeActionType} from "../../store/badges/badgesActions";

const getBadgesDisplay = (signature: BadgeSignature, useSkeleton: boolean = false) => {
   return Object.entries(signature).map(([overallType, subtypes]) => {
      return <Paper elevation={2}>
         <div style={{marginBottom: 20, padding: 5}}>{overallType}:</div>

         {Object.entries(subtypes).map(([subtype, badge]) => {
            return <div style={{display: "flex", flexDirection: "column", padding: 20}}>
               <div>{subtype}:</div>
               <div
                  style={{
                     display: "flex",
                     marginTop: 10,
                     gap: 10,
                     padding: 5,
                     flexDirection: "row"
                  }}>{badge.map((badgeObj) => {
                  const badge = BadgeMap(badgeObj.id);
                  return <Badge {...badge} earned={badgeObj.earned}/>
               })}</div>
            </div>
         })}</Paper>
   })
}

export const BadgesSheet = () => {

   const dispatch = useAppDispatch();

   useEffectOnce(() => {
      dispatch(generateAction(BadgeActionType.CHECK_BADGES, undefined));
   })
   const {badges} = useAppSelector(getSortedBadges);

   return <><h5>Badges</h5>
      <>{getBadgesDisplay(badges)}</>
   </>
}