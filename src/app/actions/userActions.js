export function setName(name) {

    // return dispatch => {
    //
    //     //simulate a server which takes a couple of seconds
    //     setTimeout(() => {
    //         dispatch({
    //             type: "USER_SET_NAME",
    //             payload: name
    //         });
    //     }, 2000);
    // }

    return {
        type: "USER_SET_NAME",
        payload: new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(name);
            },2000);
        })
    };

}

export function setAge(age) {
    return {
        type: "USER_SET_AGE",
        payload: age
    };
}