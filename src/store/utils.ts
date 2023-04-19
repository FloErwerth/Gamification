import {GamificationActionTypes} from "./actions";

export function generateAction<P, A extends GamificationActionTypes>(type: A, payload: P) {
   return {type, payload};
}