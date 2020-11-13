import React from 'react';
import Signup from "./Component/Signup/Signup";
import Login from "./Component/Login/Login";
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';
import HomePage from './Component/homepage';
import EditProfile from './Component/EditProfile/EditProfile';
import HomeGames from './Component/BoardGame/HomeGames'



class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/homePage/:id">
                    <HomePage />
                </Route>
                <Route path="/editProfile/:id">
                    <EditProfile />
                </Route>

                <Route path="/signup">
                    <Signup />
                </Route>

                <Route path="/login">
                    <Login />
                </Route>
                
            </Router>
        )
    }

}

export default Routes;