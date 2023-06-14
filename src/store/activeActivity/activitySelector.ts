import {createSelector} from "@reduxjs/toolkit";
import {getActivities} from "../activities/activitiesSelectors";
import {GamificationModel} from "../types";
import {ActivityProps, CellInfo, DateType} from "../activities/types";
import produce from "immer";
import {getCurrentlySelectedMonth} from "../calendar/calendarSelectors";
import {StatEnumType} from "../../activitiesAssembly/stats";

export type ChartData = {
   labels: DateType[],
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
   return {day: parseInt(splitt[2]), month: parseInt(splitt[1])}
}

const getDatasets = (filter: StatEnumType, dates: DateType[], activity: ActivityProps): ChartData["datasets"] => {
   const relevantCells = Object.entries(activity.calendarEntries).filter(([date, cell]) => dates.includes(date as DateType)).map(([_, cell]) => cell);

   const pairs = relevantCells.reduce((labelValuesPair, cell) => {
      const cellPairs = cell.statValuePairs;
      if (cellPairs) {
         cellPairs.forEach((cellPair) => {
            if (cellPair.statName === filter) {
               const foundPairs = labelValuesPair.find((foundPair) => foundPair.label === cellPair.statName);
               if (!foundPairs) {
                  labelValuesPair.push({label: cellPair.statName, values: [cellPair.value]});
               } else {
                  foundPairs.values.push(cellPair.value);
               }
            }
         })
      }
      return labelValuesPair
   }, [] as { label: StatEnumType, values: number[] }[])

   return pairs.map((pair) => {
      const dataset: ChartData["datasets"][number] = {
         label: pair.label,
         data: pair.values,
         pointRadius: 5,
         pointStyle: "circle",
         cubicInterpolationMode: "monotone",
      }
      return dataset;
   });
}


const sortDatasets = (dates: DateType[], datasets: ChartData["datasets"]): ChartData => {
   const datesWithIndicies: { index: number, date: DateType }[] = dates.map((date, index) => {
      return {index, date}
   })
   const sortedDatesWithIndicies = datesWithIndicies.sort((a, b) => {
      const dayMonthA = getDayMonth(a.date);
      const dayMonthB = getDayMonth(b.date);
      if (dayMonthA.month !== dayMonthB.month) {
         return dayMonthA.month - dayMonthB.month;
      } else {
         return dayMonthA.day - dayMonthB.day;
      }
   });

   const sortedData = produce(datasets[0]?.data, newData => {
      for (let i = 0; i < newData?.length; i++) {
         const currentIndex = sortedDatesWithIndicies[i].index;
         newData[i] = datasets[0].data[currentIndex];
      }
   });

   const sortedDatasets = datasets.map((dataset, index) => {
      return {...dataset, data: sortedData}
   })


   return {labels: sortedDatesWithIndicies.map((dates) => dates.date), datasets: sortedDatasets};
}

export const getActivityChartData = (filter: StatEnumType, showAllMonths: boolean = false) => createSelector([getCurrentlySelectedMonth, getActiveActivity], (month, {activity}): ChartData | undefined => {
   const dates = Object.keys(activity?.calendarEntries).filter((date) => parseFloat(date.split("-")[1]) === month || showAllMonths) as DateType[];
   const datasets = getDatasets(filter, dates, activity);
   return sortDatasets(dates, datasets);
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