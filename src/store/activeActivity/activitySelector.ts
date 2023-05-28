import {createSelector} from "@reduxjs/toolkit";
import {getActivities} from "../activities/activitiesSelectors";
import {GamificationModel} from "../types";
import {CellInfo, DateType} from "../activities/types";
import produce from "immer";
import {getCurrentlySelectedMonth} from "../calendar/calendarSelectors";
import {StatEnumType} from "../../activitiesAssembly/stats";

export type ChartData = { labels: string[], datasets: { label: StatEnumType, data: number[], cubicInterpolationMode: "monotone", pointStyle: "circle", pointRadius: 5, }[] };
const getActivityIndex = ({activeActivityIndex}: GamificationModel) => activeActivityIndex;

export const getActiveActivity = createSelector([getActivities, getActivityIndex], (activities, index) => {
   return {index, activity: activities[index]};
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
         entry.stats?.forEach(({name}) => {
            const index = cellLabels.findIndex(({label}) => label === name);
            if (index === -1) {
               cellLabels.push({numEntries: 1, label: name});
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

      Object.entries<CellInfo>(activity.calendarEntries).forEach(([date, cellInfo]) => cellInfo.stats?.forEach((stat) => {
         const dataset = chartData.datasets[chartData.datasets.findIndex((data) => data.label === stat.name)];
         if (dataset && dataset.data && (month === getDayMonth(date as DateType).month || showAllMonths) && stat.name === filter) {
            if (!chartData.labels?.includes(date as DateType)) {
               chartData.labels?.push(date as DateType);
            }
            chartData.datasets[chartData.datasets.findIndex((data) => data.label === stat.name)] = produce(dataset, newDataSet => {
               if (stat.value) {
                  newDataSet.data = [...dataset.data, stat.value];
               }
               return newDataSet;
            });
         }
      }));
      return sortObject(chartData);
   } else return undefined;
})

const disallowedNames: StatEnumType[] = ["Speed"];
export const getCumulatedData = createSelector([getActiveActivity], ({activity}) => {
   if (activity && activity.stats && activity.calendarEntries) {
      const dataObject: { label: StatEnumType, data: number }[] = [];
      Object.values<CellInfo>(activity.calendarEntries).forEach((cellInfo) => cellInfo.stats?.filter((stat) => {
         return !disallowedNames.includes(stat.name)
      }).forEach((stat) => {
         if (stat.value) {
            const index = dataObject.findIndex((data) => data.label === stat.name);
            if (index === -1) {
               dataObject.push({label: stat.name, data: stat.value});
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
   return activeActivity.activity.stats.find((activityStat) => activityStat.name === stat);
});

export const getActiveActivityInfos = createSelector([getActiveActivity], (activeActivitiy) => {
   return activeActivitiy.activity.stats;
})