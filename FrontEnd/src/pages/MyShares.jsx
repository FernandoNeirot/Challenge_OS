import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMySharesByUser, getSymbolList, addShare, getShare } from '../store/ducks/mysharesDuck'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, Grid, IconButton, TextField, Tooltip } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import DeleteIcon from '@material-ui/icons/Delete';

const MyShares = () => {
    const [value, setValue] = React.useState("");
    const [inputValue, setInputValue] = React.useState('');

    const dispatch = useDispatch()
    const { myshares, symbolList, } = useSelector(state => state.myshares)
    const { user } = useSelector(state => state.user)

    const handleAddShare = () => {
        if (value !== "") {
            dispatch(getShare(value)).then((resGet) => {
                dispatch(addShare(resGet.payload.data.data[0])).then((resAdd) => {               
                })
            })
                .catch((err) => {
                    console.log("ERROR", err);
                });
        } else {
            console.log("ERROR")
        }
    }

    const handleClickSymbol=(data)=>{
        console.log(data)
    }

    const columns = [
        {
          name: "symbol",
          label: "Simbolo",
          options: {
            filter: false,
            sort: false,
            empty: true,
            viewColumns: false,
            customBodyRenderLite: (dataIndex) => {
              let rowData = myshares[dataIndex];
              //console.log(rowData);
              return (
                <Button onClick={()=>handleClickSymbol(rowData)}>
                    {rowData.symbol}
                </Button>
              );
            },
            setCellProps: () => ({ style: { width: 130, textAlign: "right" } }),
          },
        },
        {
          name: "name",
          label: "Nombre",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
            name: "currency",
            label: "Moneda",
            options: {
              filter: true,
              sort: true,
            },
          },
        //Actions
        {
          name: "",
          label: "",
          options: {
            filter: false,
            sort: false,
            empty: true,
            viewColumns: false,
            customBodyRenderLite: (dataIndex) => {
              let rowData = myshares[dataIndex];
              //console.log(rowData);
              return (
                <div styles={{ maxWidth: 250 }}>                  
                  <Tooltip title={"Delete"}>
                    <IconButton
                      aria-label="delete"
                      size="small"
                    //   onClick={handleConfirm(rowData)}
                    >
                      <DeleteIcon/>
                    </IconButton>
                  </Tooltip>
                </div>
              );
            },
            setCellProps: () => ({ style: { width: 130, textAlign: "right" } }),
          },
        },
      ];
    useEffect(() => {
        dispatch(getSymbolList())
        dispatch(getMySharesByUser(user))
    }, [])

    return (
        <Grid>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: "80px" }}
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
                        options={symbolList.map(x => x.symbol)}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Symbol" />}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Button
                        style={{ marginLeft: "20px" }}
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddShare()}
                    >
                        Agregar
                </Button>
                </Grid>
            </Grid>
            <MUIDataTable
                title={"Mis Acciones"}
                // elevation={2}
                columns={columns}
                data={myshares}
                // options={dtOptions}
            />
        </Grid>
    )
}

export default MyShares
