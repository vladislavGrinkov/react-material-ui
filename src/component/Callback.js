import React from 'react';

import {withAuth} from "./AuthService/AuthService";

class Callback extends React.Component{

    componentDidMount() {
        const {handleAuthentication} = this.props;
        if(handleAuthentication){
            handleAuthentication();
        }
    }

    render(){
        return(
            <div>
            </div>
        )
    }
}

export default withAuth(Callback)