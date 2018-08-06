import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./components/reducers";

const middleware = [thunk];
const initialState = {};

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
);

export default store;
