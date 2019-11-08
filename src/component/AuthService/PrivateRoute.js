import React from 'react';
import {withAuth} from "./AuthService";
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = withAuth(({component: RouteComponent, isAuthorized, ...rest}) => (
    <Route {...rest} render={routeProps => (
        localStorage.getItem('id_token')
            ?
            <RouteComponent {...routeProps}/>
            :
            <Redirect to={'/login'}/>
    )}/>
));

export default PrivateRoute;