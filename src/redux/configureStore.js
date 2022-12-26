import { combineReducers, createStore } from "redux";
import { GetHistoryInfo } from "./actions/getHistory";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      HistoryInfo: GetHistoryInfo,
    })
  );

  return store;
};
