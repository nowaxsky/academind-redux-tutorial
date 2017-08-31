const userReducer = (state = {name: "Max", age: 27}, action) => {
    switch (action.type) {

        //for redux-promise
        case "USER_SET_NAME_FULFILLED":
            state = {
                ...state,
                name: action.payload
            };
            break;
        case "USER_SET_AGE":
            state = {
                ...state,
                age: action.payload
            };
            break;
    }
    return state;
};

export default userReducer;