import React from 'react';
import './Login.css'
import {withAuth} from "../AuthService/AuthService";

export default withAuth(({isAuthorized, onChangeState}) => (
    // isAuthorized
    //    ?
    //    <Redirect to={'/public'}/>
    //    :
    <div className={'center'}>
        <div>
            <h1>Welcome</h1>
        </div>
        <div>
            <button className={'form-submit'} onClick={onChangeState}>Authorization</button>
        </div>
    </div>
));