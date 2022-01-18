import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMySharesByUser, getSymbolList,addShare,getShare } from '../store/ducks/mysharesDuck'
import * as yup from "yup";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

const MyShares = () => {
    const [value, setValue] = React.useState("");
    const [inputValue, setInputValue] = React.useState('');

    const dispatch = useDispatch()
    const {myshares,symbolList} = useSelector(state => state.myshares)
    const { user } = useSelector(state => state.user)

    const handleAddShare = () =>{
        if(value!==""){
            console.log(value)
            console.log(inputValue)
            dispatch(getShare(value)).then((resGet) => {
                console.log("GEt",resGet.payload.data.data[0])
                dispatch(addShare(resGet.payload.data.data[0])).then((resAdd)=>{
                    console.log("Add",resAdd);
                })
              })
              .catch((err) => {
                console.log("ERROR",err);
              });
        }else{
            console.log("ERROR")
        }
        
    }

    useEffect(() => {
        dispatch(getSymbolList())
        dispatch(getMySharesByUser(user))
    }, [])
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{marginTop:"80px"}}
        >
            <Grid item xs={4}>
                <Autocomplete
                    fullWidth
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    id="symbol-autocomplete"
                    options={symbolList.map(x=>x.symbol)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Symbol" />}
                />
            </Grid>
            <Grid item xs={1}>
                <Button
                    style={{marginLeft:"20px"}}
                    variant="contained"
                    color="primary"
                    onClick={()=>handleAddShare()}
                >
                    Agregar
                </Button>
            </Grid>
        </Grid>
    )
}

export default MyShares
