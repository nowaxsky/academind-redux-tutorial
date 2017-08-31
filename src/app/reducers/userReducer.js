const userReducer = (state = {name: "Max", age: 27}, action) => {
    switch (action.type) {
        case "USER_SET_NAME":
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