import React from 'react';
import Signup from "./Component/Signup/Signup";
import Login from "./Component/Login/Login";
import { BrowserRouter as Router, Route } from 'react-router-dom';


class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path="/">
                    <Login />
                </Route>

                <Route exact path="/signup">
                    <Signup />
                </Route>

                <Route exact path="/login">
                    <Login />
                </Route>
            </Router>
        )
    }

}

export default Routes;