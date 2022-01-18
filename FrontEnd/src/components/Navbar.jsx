import { Button, Grid} from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  logoutUser } from '../store/ducks/userDuck'

const Navbar = () => {
    const dispatch = useDispatch()
    const { user, isLogin } = useSelector(state => state.user)

    const handleLogout = () => {
        dispatch(logoutUser());
    }
    return (
        <nav
            style={{
                width: "100%",
                height: "50px",
                background: "grey"
            }}
        >{
                isLogin && (<Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center">
                    Bienvenido: {user}
                    <Button
                        style={{ marginRight: "20px", marginLeft: "20px" }}
                        onClick={() => handleLogout()} variant="contained" color="primary">
                        LogOut
            </Button></Grid>)

            }

        </nav>
    )
}

export default Navbar
