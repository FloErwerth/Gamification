import {GamificationModel} from "../types";
import {createSelector} from "@reduxjs/toolkit";
import {Temporal} from "@js-temporal/polyfill";

export const getEmail = ({authentication}: GamificationModel) => authentication.email;
export const getIsLoggedIn = ({authentication}: GamificationModel) => authentication.loggedIn;
export const getUserId = ({authentication}: GamificationModel) => authentication.userId;
export const getStayLoggedIn = ({authentication}: GamificationModel) => authentication.stayLoggedIn;
export const getCreationDate = ({authentication}: GamificationModel) => authentication.creationDate;
export const getLoginData = createSelector([getEmail, getIsLoggedIn], (email, loggedIn) => {
   return {email, loggedIn}
})
export const getDaysSinceCreation = createSelector([getCreationDate], creationDate => {
   const temporalDate = Temporal.PlainDate.from(creationDate);
   return temporalDate.until(Temporal.Now.plainDateTimeISO()).days;
})
export const getFormatedTimeSinceCreation = createSelector([getDaysSinceCreation], daysSinceCreation => {
   const years = Math.floor(daysSinceCreation / 365);
   const months = Math.floor(daysSinceCreation / 12);
   const remainingDays = daysSinceCreation - ((years * 365) + (months * 12))
   return `years: ${years}, months: ${months}, days: ${remainingDays}`;
})
