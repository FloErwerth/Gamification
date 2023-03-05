import { GamificationModel } from "../store/types"

export const saveState = (state: GamificationModel) => {
    localStorage.setItem("gamification", JSON.stringify(state));
}

export const getState = () => {
    const state = localStorage.getItem("gamification");
    if(state) {
        return JSON.parse(state) as GamificationModel;
    } else return undefined;
}