import { Button, Grid, TextField } from '@material-ui/core';
import { FormikProvider, useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import { login } from '../store/ducks/userDuck';
const validationSchema = yup.object({
    userName: yup.string().required("Is required"),
    password: yup.string().required("Is required"),
});
const initialValues = {
    userName: "Fernando.neirot@hotmail.com",
    password: "12345",
};
const Login = () => {
    const dispatch = useDispatch()
    const error = useSelector(state => state.user.hasError)
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(login(values));
        },
    });

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}
                style={{
                    width: "40%",
                    marginLeft: "30%",
                    marginTop: "150px",
                    padding: "25px",
                    border: "solid 1px",
                }}
            >
                <Grid container direction="row" item xs={12}>
                    <Grid item xs={12} style={{ marginBottom: "20px" }} >
                        <TextField
                            id="userName"
                            variant="outlined"
                            name="userName"
                            label="userName"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            error={formik.touched.userName && Boolean(formik.errors.userName)}
                            helperText={formik.touched.userName && formik.errors.userName}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid container direction="row" item xs={12}>
                    <Grid item xs={12} style={{ marginBottom: "20px" }} >
                        <TextField
                            id="password"
                            variant="outlined"
                            type="password"
                            name="password"
                            label="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Grid container direction="row">
                    <Grid item xs={8} />
                    <Grid item xs={12}>

                        <Button
                            color="primary"
                            onClick={formik.handleSubmit}
                            variant="contained"
                            style={{ marginLeft: "1%" }}
                        >
                            Save
              </Button>
                    </Grid>

                </Grid>
                {
                    error ? (
                        <Grid >
                            Usuario o Clave Incorrecta
                        </Grid>
                    ) : null
                }
                <Grid>

                </Grid>
            </form>
        </FormikProvider>

    )
}

export default Login
