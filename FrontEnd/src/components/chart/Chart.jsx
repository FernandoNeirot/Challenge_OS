import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
const Chart = ({data}) => {
    const {meta,values}=data;
    let dataToChart = values.map(x=>{
        return {
            qoute:x.open,
            date:x.datetime
        }
    });

    const options = {
        chart: {
            type: 'spline'
          },
          title: {
            text: `COTIZACION DE ACCIONES: Simbolo ${meta.symbol}`
          },
          subtitle: {
            text: 'Fuente: https://twelvedata.com/'
          },
          xAxis: {
            categories: dataToChart.map(x=>x.date).reverse()
          },
          yAxis: {
            title: {
              text: 'Cotizacion'
            }
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: false
            }
          },
          series: [{
            name: `Contizaciones con intervalo de ${meta.interval}`,
            data: dataToChart.map(x=>parseFloat(x.qoute)).reverse()
          }]
      }

    return (
        <div>
            <HighchartsReact 
                highcharts={Highcharts} options={options}
            />
        </div>
    )
}

export default Chart
