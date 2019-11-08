import React, { Component } from 'react';
import './App.css'
import {NavLink, Route, Redirect, Switch} from "react-router-dom";
import {AuthService} from "./component/AuthService/AuthService";
import PrivateRoute from "./component/AuthService/PrivateRoute";
import PrivatePage from "./component/PrivatePage";
import PublicPage from "./component/PublicPage";
import Login from "./component/Login/Login";
import Callback from "./component/Callback";

export default class App extends Component {
    render(){
        return(
            <AuthService>
                <nav>
                    <NavLink to={'/public'}>
                        Home
                    </NavLink>
                    <NavLink to={'/private'}>
                        Profile
                    </NavLink>
                </nav>

                <Switch>
                    <Route path={'/public'} component={PublicPage}/>
                    <Route path={'/login'} component={Login}/>
                    <Route path={'/callback'} component={Callback}/>
                    <PrivateRoute path={'/private'} component={PrivatePage}/>
                    <Redirect to={'/public'}/>
                </Switch>
            </AuthService>
        )
    }
};
