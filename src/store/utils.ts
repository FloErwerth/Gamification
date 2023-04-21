import {StoreActions} from "./store";

export function generateAction<P, A extends StoreActions>(type: A, payload: P) {
   return {type, payload};
}