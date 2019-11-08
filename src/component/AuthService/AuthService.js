import React from 'react';
import {withRouter} from 'react-router-dom'
import auth0 from 'auth0-js';

const {Provider, Consumer: AuthConsumer} = React.createContext({
    isAuthorized: false
});

class AuthService extends React.Component{
    state = {
        isAuthorized: false
    };

    auth0 = new auth0.WebAuth({
       domain: 'dev-q36a0o-2.auth0.com',
       clientID: '2MUTUwfvjsolP7FVG5nqJmKeLHYdP8Vz',
       redirectUri: 'http://localhost:3000/callback',
       responseType: 'token id_token',
       scope: 'openid'
    });

    onChangeState = () => {
        this.auth0.authorize();
    };

    setToken = (idToken) => {
      localStorage.setItem('id_token', idToken)
    };

    //set hash in authResult
    handleAuthentication = () => {
      this.auth0.parseHash((err, authResult) => {
          console.log(authResult);
          this.setToken(authResult.idToken);
        if(authResult && authResult.idToken){
            this.setState({
                isAuthorized: true,
            }, () => {
              this.props.history.push('/private');
            })
        }else if(err){
            console.log(err);
        }
      });
    };

    render(){
        const {isAuthorized} = this.state;
        return(
            <Provider value={{isAuthorized, onChangeState: this.onChangeState, handleAuthentication: this.handleAuthentication}}>
                {this.props.children}
            </Provider>
        )
    }
}

export function withAuth(WrappedComponent) {
    return class AuthHOC extends React.Component{
        render(){
            return(
                <AuthConsumer>
                    {contextProps => (
                        <WrappedComponent {...contextProps} {...this.props}/>
                    )}
                </AuthConsumer>
            )
        }
    }
}

const AuthProviderWithRouter = withRouter(AuthService);

export {AuthProviderWithRouter as AuthService};