import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  
    Route,
    Redirect
  } from "react-router-dom";
import { loginLocalStorage } from '../store/ducks/userDuck';

const PrivateRoute = ({component, path, ...rest}) => {
    const dispatch = useDispatch()
    const { isLogin } = useSelector(state => state.user)

    if (localStorage.getItem('user') && !isLogin) {
        dispatch(loginLocalStorage(
            JSON.parse(localStorage.getItem('user'))
        ))
    }
    return (
        <div>
            {
                isLogin?
                (<Route component={component} path={path} {...rest} />):
                (<Redirect to="/login" {...rest} />)
            }    
        </div>
    )
}

export default PrivateRoute
