import { composeWithDevTools } from "@redux-devtools/extension";
import createSagaMiddleware from "@redux-saga/core";
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";

import rootSaga from "./redux/sagas";
import userReducer from "./redux/slice/user";

const reducer = combineReducers({
  user: userReducer,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
