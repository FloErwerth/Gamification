import {createSelector} from "@reduxjs/toolkit";
import {getActivities} from "../activities/activitiesSelectors";
import {GamificationModel} from "../types";
import {ActivityProps, CellInfo, DateType} from "../activities/types";
import produce from "immer";
import {getCurrentlySelectedMonth} from "../calendar/calendarSelectors";
import {StatEnumType} from "../../activitiesAssembly/stats";

export type ChartData = { dateLabels: DateType[], datasets: { label: StatEnumType, data: number[], cubicInterpolationMode: "monotone", pointStyle: "circle", pointRadius: 5, }[] };
const getActivityIndex = ({activeActivityIndex}: GamificationModel) => activeActivityIndex;

export const getActiveActivity = createSelector([getActivities, getActivityIndex], (activities, index) => {
   return {index, activity: activities[index]};
});

const getDayMonth = (date: DateType) => {
   const splitt = date.split("-");
   return {day: parseInt(splitt[0]), month: parseInt(splitt[1])}
}

const sortObject = (chartData: ChartData): ChartData => {
   return produce(chartData, newChartData => {
      newChartData.dateLabels.sort((a, b) => {
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
         newChartData.dateLabels.forEach((date) => {
            newData.push(dataset.data[chartData.dateLabels.indexOf(date)])
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

export const getChartData = (activity?: ActivityProps, showAllMonths: boolean = false) => createSelector([getCurrentlySelectedMonth], (month): ChartData | undefined => {
   if (activity && activity.stats && activity.calendarEntries) {
      const chartData: ChartData = {
         dateLabels: [], datasets: activity.stats.map((stat: StatEnumType) => {
            return {
               label: stat,
               dates: [],
               data: [],
               cubicInterpolationMode: "monotone",
               pointStyle: "circle",
               pointRadius: 5
            };
         })
      };

      Object.entries<CellInfo>(activity.calendarEntries).forEach(([date, cellInfo]) => cellInfo.stats?.forEach((stat) => {
         const dataset = chartData.datasets[chartData.datasets.findIndex((data) => data.label === stat.name)];
         if (month === getDayMonth(date as DateType).month || showAllMonths) {
            if (!chartData.dateLabels.includes(date as DateType)) {
               chartData.dateLabels.push(date as DateType);
            }
            chartData.datasets[chartData.datasets.findIndex((data) => data.label === stat.name)] = produce(dataset, newDataSet => {
               newDataSet.data = [...dataset.data, stat.value];
               return newDataSet;
            });
         }
      }));
      return sortObject(chartData);
   } else return undefined;
})