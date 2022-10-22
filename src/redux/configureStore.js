import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { GetHistoryInfo } from "./actions/getHistory";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      HistoryInfo: GetHistoryInfo,
    }),
    applyMiddleware(thunk)
  );

  return store;
};
