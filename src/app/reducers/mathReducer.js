const mathReducer = (state = {result: 1, lastValues: [],}, action) => {
    switch (action.type) {
        //use prefix to avoid overwriting
        case "MATH_ADD":

            state = {
                ...state,
                result: state.result + action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;
        case "MATH_SUBTRACT":
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

export default mathReducer;