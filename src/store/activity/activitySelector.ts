import {createSelector} from "@reduxjs/toolkit";
import {getActivities} from "../activities/activitiesSelectors";
import {GamificationModel} from "../types";
import {CellInfo, DateType} from "../activities/types";
import {StatEnum} from "../activities/predefinedActivities";
import produce from "immer";
import {getCurrentlySelectedMonth} from "../calendar/calendarSelectors";

export type ChartData = { dateLabels: DateType[], datasets: { label: StatEnum, data: number[], cubicInterpolationMode: "monotone", pointStyle: "circle", pointRadius: 5, }[] };
const getActivityIndex = ({activeActivityIndex}: GamificationModel) => activeActivityIndex;

export const getActiveActivity = createSelector([getActivities, getActivityIndex], (activities, index) => {
   return {index, activity: activities[index]};
});

const getDay = (day: DateType) => {
   return parseInt(day.split("-")[0]);
}

const sortObject = (chartData: ChartData): ChartData => {
   return produce(chartData, newChartData => {
      newChartData.dateLabels.sort((a, b) => getDay(a) - getDay(b));
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

export const getChartData = createSelector([getActiveActivity, getCurrentlySelectedMonth], (activteActivity, month): ChartData | undefined => {
   if (activteActivity.activity && activteActivity.activity.stats && activteActivity.activity.calendarEntries) {
      const chartData: ChartData = {
         dateLabels: [], datasets: activteActivity.activity.stats.map((stat) => {
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

      Object.entries<CellInfo>(activteActivity.activity.calendarEntries).forEach(([date, cellInfo]) => cellInfo.stats?.forEach((stat) => {
         const dataset = chartData.datasets[chartData.datasets.findIndex((data) => data.label === stat.name)];
         if (month === parseInt(date.split("-")[1])) {
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