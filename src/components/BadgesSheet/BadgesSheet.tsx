import {Badge} from "../Badge/Badge";
import {BadgeSkeleton} from "../Badge/BadgeSkeleton";
import {useAppSelector} from "../../store/store";
import {getBadges, getNotEarnedBadges} from "../../store/badges/badgesSelector";

export const BadgesSheet = () => {
   const badgesEarned = useAppSelector(getBadges);
   const badgesNotEarned = useAppSelector(getNotEarnedBadges);

   return <><h5>Badges</h5>
      <>{badgesEarned.map((badge) => <Badge {...badge} />)}</>
      <>{badgesNotEarned.map((badge) => <BadgeSkeleton SVG={badge.SVG}/>)}</>
   </>
}