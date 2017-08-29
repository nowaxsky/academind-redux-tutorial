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

import { createStore } from "redux";

const initialState = {
    result: 1,
    lastValues: [],
    username: "Max"
};

const reducer = (state = initialState, action) => {
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

//reducer has been initialized by initialState
const store = createStore(reducer);

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