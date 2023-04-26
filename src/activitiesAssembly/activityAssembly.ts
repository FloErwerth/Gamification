import {CreativityActivityAssembly} from "./creativity/creativityActivities";
import {SportsActivityAssembly} from "./sports/sportActivities";
import {PredefinedActivities} from "./predefinedActivities";
import {StatEnumType} from "./stats";

export function ActivityAssembly<T extends PredefinedActivities>(statEnum: T): StatEnumType[] {
   return [
      ...CreativityActivityAssembly(statEnum),
      ...SportsActivityAssembly(statEnum),
   ]
}