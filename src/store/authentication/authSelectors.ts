import {GamificationModel} from "../types";
import {createSelector} from "@reduxjs/toolkit";

export const getEmail = ({authentication}: GamificationModel) => authentication.email;
export const getIsLoggedIn = ({authentication}: GamificationModel) => authentication.loggedIn;
export const getUserId = ({authentication}: GamificationModel) => authentication.userId;
export const getStayLoggedIn = ({authentication}: GamificationModel) => authentication.stayLoggedIn;
export const getLoginData = createSelector([getEmail, getIsLoggedIn], (email, loggedIn) => {
   return {email, loggedIn}
})
