import {createSelector} from "@reduxjs/toolkit";
import {getActivities} from "../activities/activitiesSelectors";
import {GamificationModel} from "../types";
import {CellInfo, DateType} from "../activities/types";
import produce from "immer";
import {getCurrentlySelectedMonth} from "../calendar/calendarSelectors";
import {Stat, StatEnumType} from "../../activitiesAssembly/stats";

export type ChartData = {
   labels: string[],
   datasets: {
      label: StatEnumType,
      data: number[],
      cubicInterpolationMode: "monotone",
      pointStyle: "circle",
      pointRadius: 5,
   }[]
};
const getActivityIndex = ({activeActivityIndex}: GamificationModel) => activeActivityIndex;

export const getActiveActivity = createSelector([getActivities, getActivityIndex], (activities, index) => {
   return {index, activity: activities?.[index]};
});

const getDayMonth = (date: string) => {
   const splitt = date.split("-");
   if (splitt.length < 3) {
      return {day: 0, month: 0}
   }
   return {day: parseInt(splitt[0]), month: parseInt(splitt[1])}
}

const sortObject = (chartData: ChartData): ChartData => {
   return produce(chartData, newChartData => {
      newChartData.labels.sort((a, b) => {
         const dayMonthA = getDayMonth(a);
         const dayMonthB = getDayMonth(b);
         if (dayMonthA.month !== dayMonthB.month) {
            return dayMonthA.month - dayMonthB.month;
         } else {
            return dayMonthA.day - dayMonthB.day;
         }
      });

      const datasets: ChartData["datasets"] = [];
      newChartData.datasets.forEach((dataset) => {
         const newData: number[] = [];
         newChartData.labels.forEach((date) => {
            newData.push(dataset.data[chartData.labels?.indexOf(date) ?? 0])
         })
         datasets.push({
            label: dataset.label,
            data: newData,
            cubicInterpolationMode: "monotone",
            pointStyle: "circle",
            pointRadius: 5
         })
      })
      newChartData.datasets = datasets;
   })
}

export const getActivityChartData = (filter: StatEnumType, showAllMonths: boolean = false) => createSelector([getCurrentlySelectedMonth, getActiveActivity], (month, {activity}): ChartData | undefined => {
   if (activity && activity.stats && activity.calendarEntries) {
      const cellLabels: { numEntries: number, label: StatEnumType }[] = [];
      Object.values<CellInfo>(activity.calendarEntries).forEach((entry) => {
         entry.statValuePairs?.forEach((value, index) => {
            if (index > cellLabels.length) {
               cellLabels.push({numEntries: 1, label: activity.stats[index].statName});
            } else {
               cellLabels[index].numEntries += 1;
            }
         })
      })
      const chartData: ChartData = {
         labels: [],
         datasets: cellLabels.filter(({numEntries}) => numEntries >= 2).map(({label}) => {
            return {
               label: label,
               data: [],
               cubicInterpolationMode: "monotone",
               pointStyle: "circle",
               pointRadius: 5
            };
         })
      };

      Object.values<Stat>(activity.stats).forEach((stat, index) => {
         const dataset = chartData.datasets[index];
         const cellInfos = Object.entries(activity.calendarEntries).filter((_, cellIndex) => cellIndex === index);
         cellInfos.forEach(([date, info]) => {
            if (dataset && (month === getDayMonth(date).month || showAllMonths) && stat.statName === filter) {
               if (!chartData.labels?.includes(date as DateType)) {
                  chartData.labels?.push(date as DateType);
               }
               chartData.datasets[index] = produce(dataset, newDataSet => {
                  if (info.statValuePairs?.[index]) {
                     newDataSet.data = [...dataset.data, info.statValuePairs[index].value];
                  }
                  return newDataSet;
               });
            }
         })
      });
      return sortObject(chartData);
   } else return undefined;
})

const disallowedNames: StatEnumType[] = ["Speed"];
export const getCumulatedData = createSelector([getActiveActivity], ({activity}) => {
   if (activity && activity.stats && activity.calendarEntries) {
      const dataObject: { label: StatEnumType, data: number }[] = [];
      Object.values<CellInfo>(activity.calendarEntries).forEach((cellInfo) => cellInfo.statValuePairs?.filter((stat) => {
         return !disallowedNames.includes(stat.statName)
      }).forEach((stat) => {
         if (stat.value) {
            const index = dataObject.findIndex((data) => data.label === stat.statName);
            if (index === -1) {
               dataObject.push({label: stat.statName, data: stat.value});
            } else {
               dataObject[index].data += stat.value;
            }
         }
      }))
      return dataObject;
   }

   return undefined;
})

export const getActiveActivityInfo = (stat: StatEnumType) => createSelector([getActiveActivity], (activeActivity) => {
   return activeActivity.activity?.stats.find((activityStat) => activityStat.statName === stat);
});

export const getActiveActivityInfos = createSelector([getActiveActivity], (activeActivitiy) => {
   return activeActivitiy.activity?.stats;
})