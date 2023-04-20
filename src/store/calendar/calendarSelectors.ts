import {GamificationModel} from "../types";
import {createSelector} from "@reduxjs/toolkit";

export const getDaysInMonth = ({calendar}: GamificationModel) => calendar.daysInMonth;
export const getCurrentlySelectedMonth = ({calendar}: GamificationModel) => calendar.currentlySelectedMonth;

export const getDaysInMonthInArray = createSelector([getDaysInMonth], days => {
   const daysArray = [];
   for (let day = 0; day < days; day++) {
      daysArray.push(day + 1);
   }
   return daysArray;
})