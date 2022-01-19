import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  
    Route,
    Redirect
  } from "react-router-dom";
import { loginLocalStorage } from '../store/ducks/userDuck';

const PublicRoute = ({component, path, ...rest}) => {
    const [isLogin, setIsLogin] = useState(false)
    const dispatch = useDispatch();
    //TODO: Validar contra backend el user
    if (localStorage.getItem('user') && !isLogin) {
        dispatch(loginLocalStorage(
            JSON.parse(localStorage.getItem('user'))
        ))
        setIsLogin(true);
    }
    return (
        <div>
            {
                !isLogin?
                (<Route component={component} path={path} {...rest} />):
                (<Redirect to="/myshare" {...rest} />)
            }    
        </div>
    )
}

export default PublicRoute
