import { Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import Chart from '../components/chart/Chart';
import { getQuote } from '../store/ducks/mysharesDuck';

const ShareDetail = () => {
    const { symbol } = useParams();
    const dispatch = useDispatch()
    const { qoute } = useSelector(state => state.myshares)
    const getDateNow = () => {
        return `${moment(Date.now()).format("YYYY-MM-DD")}T00:00:00`
    }
    const intervals=[{
        value:1,
        text:"1min"
    },{
        value:5,
        text:"5min"
    },{
        value:15,
        text:"15min"
    }]
    const [dataForm, setDataForn] = useState({
        isHistorical: false,
        intervalValue: intervals[0].value,
        intervalText: intervals[0].text,
        startDate: getDateNow(),
        endDate: getDateNow(),
        symbol: symbol
    })

    
    const handleChange = (event) => {
        setDataForn({ ...dataForm, isHistorical: JSON.parse(event.target.value) });
    };
    const handleChangeStartDate = (event) => {
        setDataForn({ ...dataForm, startDate: event.target.value });
    };

    const handleChangeEndDate = (event) => {
        setDataForn({ ...dataForm, endDate: event.target.value });
    };

    const handleGraph = () => {
        console.log(dataForm)
        // dispatch(getQuote(dataForm));
    }
    useEffect(() => {
        if (!dataForm.isHistorical) {
            setDataForn({ ...dataForm, startDate: getDateNow() })
        }
    }, [dataForm.isHistorical])

    useEffect(() => {
        
        const interval = setInterval(() => {
          console.log("Cambio",dataForm.intervalValue)
        }, parseInt(dataForm.intervalValue+'000'));
        return () => clearInterval(interval);
      }, [dataForm.intervalValue]);

    return (
        <Grid container >
            <Grid style={{ marginLeft: "40%", marginTop: "50px" }}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">{symbol} - Descripcion del simbolo</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={dataForm.isHistorical}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={false} control={<Radio />} label="Tiempo Real" />
                        <FormControlLabel value={true} control={<Radio />} label="Historico" />
                    </RadioGroup>
                </FormControl>
                {
                    dataForm.isHistorical && (<Grid>

                        <TextField
                            id="datetime-local"
                            label="Fecha Inicia"
                            type="datetime-local"
                            value={dataForm.startDate}
                            onChange={handleChangeStartDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="datetime-local"
                            label="Fecha Final"
                            type="datetime-local"
                            value={dataForm.endDate}
                            onChange={handleChangeEndDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </Grid>
                    )
                }

                <Grid container direction="row">
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Selecionar Intervalo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dataForm.intervalText}
                                label="Selecionar Intervalo"
                                onChange={(event, newValue) => {
                                    console.log(newValue)
                                setDataForn({ ...dataForm, 
                                                intervalText: newValue.props.value,
                                                intervalValue: intervals.find(x=>x.text===newValue.props.value).value });
                            }}
                            >
                                <MenuItem value={"1min"}>1min</MenuItem>
                                <MenuItem value={"5min"}>5min</MenuItem>
                                <MenuItem value={"15min"}>15min</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <Autocomplete
                            fullWidth
                            style={{ width: "200px" }}
                            value={dataForm.intervalValue}
                            onChange={(event, newValue) => {
                                setDataForn({ ...dataForm, intervalValue: newValue });
                            }}
                            inputValue={dataForm.intervalText}
                            onInputChange={(event, newInputValue) => {
                                setDataForn({ ...dataForm, intervalText: newInputValue });
                            }}
                            id="symbol-autocomplete"
                            options={['1min', '5min', '15min']}
                            // sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Selecionar Intervalo" />}
                        /> */}
                    </Grid>

                    <Grid item style={{ marginTop: "10px" }}>
                        <Button
                            style={{ marginLeft: "20px" }}
                            variant="contained"
                            color="primary"
                            onClick={() => handleGraph()}
                        >
                            Graficar
                    </Button>
                    </Grid>
                </Grid>

            </Grid>
            <Grid item xs={9} style={{ marginTop: "20px", border: "solid 1px", marginLeft: "15%" }}>
                <Chart data={qoute} />
            </Grid>

        </Grid>
    )
}

export default ShareDetail
