import {GeneralBadgeType} from "../../store/badges/types";

interface IBadgeSkeletonProps {
   SVG: GeneralBadgeType["SVG"]
}

export const BadgeSkeleton = ({SVG}: IBadgeSkeletonProps) => {
   return <SVG style={{width: 100, height: 100, filter: "saturate(0.1) brightness(0.5)"}}/>
}