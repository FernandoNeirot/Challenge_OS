import { Button, Grid } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router'
import { logoutUser } from '../store/ducks/userDuck'
import { useHistory } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const { user, isLogin } = useSelector(state => state.user)

    const handleLogout = () => {
        dispatch(logoutUser());
    }
    const handleMyshare = () => {
        history.push("/myshare");
    }
    return (
        <nav
            style={{
                width: "100%",
                height: "50px",
                background: "#2758CA",
                color:"white",
            }}
        >{
                isLogin && (
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center">
                        <Button
                            style={{ marginRight: "20px", marginLeft: "20px",color:"white",height:"100%" }}
                            onClick={() => handleMyshare()} >
                            Mis Acciones
                        </Button>
                    Bienvenido: {user}
                        <Button
                            style={{ marginRight: "20px", marginLeft: "20px" }}
                            onClick={() => handleLogout()} variant="contained" color="primary">
                            LogOut
                        </Button>
                    </Grid>
                )
            }
        </nav>
    )
}

export default Navbar
