// import React from "react";
// import {render} from "react-dom";
//
// import {User} from "./components/User";
// import {Main} from "./components/Main";
//
// class App extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             username: "Max"
//         }
//     }
//
//     changeUsername(newName) {
//         this.setState({
//             username: newName
//         });
//     }
//
//     render() {
//         return (
//             <div className="container">
//                 <Main changeUsername={this.changeUsername.bind(this)}/>
//                 <User username={this.state.username}/>
//             </div>
//         );
//     }
// }
//
// render(<App />, window.document.getElementById("app"));

import { createStore, combineReducers, applyMiddleware } from "redux";

//npm install redux-logger@2 --save
import logger from "redux-logger";

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
    combineReducers({mathReducer, userReducer}),
    {},
    applyMiddleware(myLogger, logger())

    //try this
    //applyMiddleware(myLogger)
    //applyMiddleware(logger())
);

store.subscribe(() => {
    console.log("Store updated!", store.getState());
});

store.dispatch({
    type: "ADD",
    payload: 100
});

store.dispatch({
    type: "ADD",
    payload: 22
});

store.dispatch({
    type: "SUBTRACT",
    payload: 80
});

//action needs to be unique! Cannot use "ADD" again in userReducer
store.dispatch({
    type: "SET_AGE",
    payload: 30
});