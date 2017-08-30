import {render} from "react-dom";
import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";

//npm install redux-logger@2 --save
import logger from "redux-logger";

//npm install react-redux --save
import {Provider} from "react-redux";

import App from "./containers/App";

const mathReducer = (state = {result: 1, lastValues: [],}, action) => {
    switch (action.type) {
        case "ADD":

            //immutable way to retain the old state
            state = {
                //get all old properties of an object with spread operator in ES6
                ...state,
                //override old result
                result: state.result + action.payload,
                lastValues: [...state.lastValues, action.payload]
            };

            //this way cannot retain the old state
            //state.lastValues.push(action.payload);
            break;
        case "SUBTRACT":
            state = {
                ...state,
                result: state.result - action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            state.lastValues.push(action.payload);
            break;
    }
    return state;
};

const userReducer = (state = {name: "Max", age: 27}, action) => {
    switch (action.type) {
        case "SET_NAME":
            state = {
                ...state,
                name: action.payload
            };
            break;
        case "SET_AGE":
            state = {
                ...state,
                age: action.payload
            };
            break;
    }
    return state;
};

const myLogger = (store) => (next) => (action) => {
    console.log("Logged Action: ", action);
    next(action);
};

//{} will be overwritten by the reducers which have their own initial state
const store = createStore(
    combineReducers({math: mathReducer, user: userReducer}),
    {},
    applyMiddleware(myLogger, logger())

    //try this
    //applyMiddleware(myLogger)
    //applyMiddleware(logger())
);

store.subscribe(() => {
    //console.log("Store updated!", store.getState());
});

render(

    //connect store to redux app
    <Provider store={store}>
        <App />
    </Provider>,
    window.document.getElementById("app"));