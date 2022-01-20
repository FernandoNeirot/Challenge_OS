import { Button, ButtonGroup, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router'
import Chart from '../components/chart/Chart';
import { getQuote,cleanQuote } from '../store/ducks/mysharesDuck';

const ShareDetail = () => {

    const history = useHistory();
    const { symbol } = useParams();
    const dispatch = useDispatch()
    const { quote } = useSelector(state => state.myshares)
    const { isLogin } = useSelector(state => state.user)
    const getDateNow = () => {
        return `${moment(Date.now()).format("YYYY-MM-DD")}T00:00:00`
    }
    const intervals = [{
        value: 1,
        text: "1min"
    }, {
        value: 5,
        text: "5min"
    }, {
        value: 15,
        text: "15min"
    }]
    const [dataForm, setDataForn] = useState({
        isHistorical: false,
        intervalValue: intervals[0].value,
        intervalText: intervals[0].text,
        startDate: getDateNow(),
        endDate: getDateNow(),
        symbol: symbol,
        draw: false
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
        setDataForn({ ...dataForm, draw: true });
        dispatch(getQuote(dataForm));
    }
    const goBack = () => {
        history.goBack();
    }
    useEffect(() => {
        if (!dataForm.isHistorical) {
            setDataForn({ ...dataForm, startDate: getDateNow() })
        }
    }, [dataForm.isHistorical])

    useEffect(() => {
        dispatch(cleanQuote());
    }, [])
    useEffect(() => {
        if (!isLogin) {
            history.push("/login");
        }
    }, [isLogin, history])

    //Para refrescar grafico si es en tiempo real
    useEffect(() => {
        let interval;
        if (dataForm.draw && !dataForm.isHistorical) {
            interval = setInterval(() => {
                handleGraph()
            }, parseInt(dataForm.intervalValue * 60 + '000'));
        }
        return () => clearInterval(interval);
    }, [dataForm.isHistorical, dataForm.intervalValue, dataForm.draw]);

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
                            <InputLabel id="label-select">Selecionar Intervalo</InputLabel>
                            <Select
                                labelId="label-select"
                                id="select-interval"
                                value={dataForm.intervalText}
                                label="Selecionar Intervalo"
                                onChange={(event, newValue) => {
                                    setDataForn({
                                        ...dataForm,
                                        intervalText: newValue.props.value,
                                        intervalValue: intervals.find(x => x.text === newValue.props.value).value,
                                        draw: false
                                    });
                                }}
                            >
                                {
                                    intervals.map((item) => {
                                        return (<MenuItem key={`itemIterval${item.value}`} value={item.text}>{item.text}</MenuItem>)
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item style={{ marginTop: "10px" }}>
                        <ButtonGroup disableElevation variant="contained" color="primary">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => goBack()}
                            >Volver</Button>
                            <Button
                                style={{ marginLeft: "20px" }}
                                variant="contained"
                                color="primary"
                                onClick={() => handleGraph()}
                            >
                                Graficar
                        </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>

            </Grid>
            <Grid item xs={9} style={{ width: "70%", padding: "50px", marginTop: "20px", border: "solid 1px", marginLeft: "15%" }}>
                {
                    quote.status !== "noData" ?
                    quote.status === "error" ? (
                            <>
                                {quote.message}
                            </>
                        ) : (
                            <Chart data={quote} />
                        ) : "Sin Informacion para graficar"}

            </Grid>

        </Grid>
    )
}

export default ShareDetail
