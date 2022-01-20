import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMySharesByUser, getSymbolList, addShare,deleteShare, getShare } from '../store/ducks/mysharesDuck'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, Grid, IconButton, TextField, Tooltip } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";
import { DeleteDialog } from '../components/DeleteDialog';
import VisibilityIcon from '@material-ui/icons/Visibility';

const MyShares = () => {
  const [open, setOpen] = React.useState(false);
  const [shareToDelete, setShareToDelete] = React.useState({});

  const handleClose = () => {
    setOpen(false);
  };

    let history = useHistory();
    const [value, setValue] = React.useState("");
    const [inputValue, setInputValue] = React.useState('');
    const { isLogin } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { myshares, symbolList } = useSelector(state => state.myshares)
    const { user } = useSelector(state => state.user)
    let symbolListByUser=useRef();
    let newSymbolList=useRef();
    if(myshares.length>0 && symbolList.length>0){
      symbolListByUser.current=myshares.map(x=> x.symbol);
      newSymbolList.current=symbolList.filter(x=> !symbolListByUser.current.includes(x.symbol))
    }

    const handleAddShare = () => {
        if (value !== "") {
          //TODO: Agregar un spinner para la espera del proceso
            dispatch(getShare(value)).then((resGet) => {
                let response =resGet.payload.data.data[0];
                response.userName=user;
                dispatch(addShare(response)).then((resAdd) => {                     
                  dispatch(getMySharesByUser(user));                  
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
        history.push(`/sharedetail/${data.symbol}`);
    }
    const handleConfirm=(row)=>{
      setShareToDelete(row)
      setOpen(true)
    }
    const handleDelete=(id)=>{
      setOpen(false)
      dispatch(deleteShare(id)).then((res)=>{
        dispatch(getSymbolList())
        dispatch(getMySharesByUser(user))
      })
    }
    const columns = [
        {
          name: "symbol",
          label: "Simbolo",
          options: {
            filter: true,
            sort: true,
            empty: true,
            viewColumns: false,
            customBodyRenderLite: (dataIndex) => {
              let rowData = myshares[dataIndex];
              return (
                <Grid>
                  <Button startIcon={<VisibilityIcon />} onClick={()=>handleClickSymbol(rowData)}>
                      {rowData.symbol}
                  </Button>
                </Grid>
                
              );
            },
            setCellProps: () => ({ style: { width: 80, textAlign: "center" } }),
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
              return (
                <div styles={{ maxWidth: 250 }}>                  
                  <Tooltip title={"Delete"}>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={()=>handleConfirm(rowData)}
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

    useEffect(() => {
      symbolListByUser.current = myshares.map(x=> x.symbol);
      newSymbolList.current = symbolList.filter(x=> !symbolListByUser.current.includes(x.symbol));
      setInputValue("");
    }, [myshares])
    useEffect(() => {
      if (!isLogin) {
          history.push("/login");
      }
  }, [isLogin,history])

    return (
        <Grid>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: "20px" }}
            >
                <Grid item xs={4}>
                    <Autocomplete
                        fullWidth
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        getOptionSelected={(option) => option==="" }
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="symbol-autocomplete"
                        options={newSymbolList.current?newSymbolList.current.map(x => x.symbol):[]}
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
      <DeleteDialog
        open={open}
        onClose={handleClose}
        data={shareToDelete}
        handleDelete={handleDelete}
      />
            <Grid style={{width:"90%",marginLeft:"5%",marginTop:"25px"}}>
              <MUIDataTable                  
                  title={"Mis Acciones"}
                  // elevation={2}
                  columns={columns}
                  data={myshares}                  
              />
            </Grid>
            
        </Grid>
    )
}

export default MyShares
