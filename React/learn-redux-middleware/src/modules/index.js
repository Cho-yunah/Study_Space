import { combineReducers } from "redux";
// import { counterSaga } from "./counter";
import posts from "./posts";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({ posts });
// export function* rootSaga() {
//   yield all([counterSaga()]);
// }

export default rootReducer;
