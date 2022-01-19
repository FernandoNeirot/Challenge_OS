import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import Chart from '../components/chart/Chart';
import { getQuote } from '../store/ducks/mysharesDuck';

const ShareDetail = () => {
    const { symbol } = useParams();
    const dispatch = useDispatch()
    const {qoute} = useSelector(state => state.myshares)
    const [isHistorical, setIsHistorical] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [inputValue, setInputValue] = React.useState('');
    const handleChange = (event) => {
        setIsHistorical(JSON.parse(event.target.value));
    };

    const handleGraph = () => {
        let startDate = isHistorical?"2022-01-19T12:00:00":"2022-01-19T00:00:00"
        let endDate = isHistorical?"2022-01-19T20:00:00":"2022-01-19T00:00:00"
        dispatch(getQuote(isHistorical,symbol,value,startDate,endDate));
    }
    return (
        <Grid container >
            <Grid style={{ marginLeft: "40%", marginTop: "50px" }}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">{symbol} - Descripcion del simbolo</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={isHistorical}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={false} control={<Radio />} label="Tiempo Real" />
                        <FormControlLabel value={true} control={<Radio />} label="Historico" />
                    </RadioGroup>
                </FormControl>
                <Grid container direction="row">
                    <Grid item>
                        <Autocomplete
                            fullWidth
                            style={{width:"200px"}}
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            id="symbol-autocomplete"
                            options={['1min', '5min', '15min']}
                            // sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Selecionar Intervalo" />}
                        />
                    </Grid>

                    <Grid item style={{marginTop:"10px"}}>
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
            <Grid item xs={9} style={{ marginTop:"20px",border:"solid 1px",marginLeft:"15%" }}>
                <Chart data={qoute}/>
            </Grid>

        </Grid>
    )
}

export default ShareDetail
