import React from "react";
import {connect} from "react-redux";

import {User} from "./User";
import {Main} from "./Main";

class App extends React.Component {

    render() {
        return (

            //this.props.user.name is property "name" of userReducer

            <div className="container">
                <Main changeUsername={() => this.props.setName("Anna")} />
                <User username={this.props.user.name} />
            </div>
        );
    }
}

//which properties of global application state do you want to use in this component,
//and local properties in this component do you want to map them

//state is passed from redux
const mapStateToProps = (state) => {
    return {

        //state.use means userReducer
        user: state.user,

        //state.math means mathReducer
        math: state.math
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch({
                type: "SET_NAME",
                payload: name
            });
        }
    };
};

//tell react-redux you want to connect this component to the redux store,
//you can tell react-redux which properties and actions you want to use
//with two methods, mapStateToProps and mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(App);