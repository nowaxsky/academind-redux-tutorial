import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

//use an asynchronous action
//npm install redux-thunk --save
import thunk from "redux-thunk";

import promise from "redux-promise-middleware";

import math from "./reducers/mathReducer";
import user from "./reducers/userReducer";

export default createStore(
    combineReducers({
        math,
        user
    }),
    {},
    applyMiddleware(logger(), thunk, promise())
);