import {StatEnumType} from "./stats";
import {CreativityActivityAssembly} from "./creativityActivities";
import {SportsActivityAssembly} from "./sportActivities";
import {PredefinedActivities} from "./predefinedActivities";
import {PersonalActivityAssembly} from "./personalActivities";

export function ActivityAssembly<T extends PredefinedActivities>(statEnum: T): StatEnumType[] {
   return [
      ...PersonalActivityAssembly(statEnum),
      ...SportsActivityAssembly(statEnum),
      ...CreativityActivityAssembly(statEnum),
   ]
}