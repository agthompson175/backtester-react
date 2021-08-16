import React, { Component } from 'react'
import Plot from 'react-plotly.js'

class SMA extends Component {
    state = {

    }

    componentDidMount() {
        this.fetchStock()
    }

    fetchStock() {
        const pointerToThis = this
        let stockChartXValuesFunction = []
        let stockChartYValuesFunction = []
        let stockTicker = ''
        let BUYBUYBUYx = []
        let BUYBUYBUYy = []
        let SELLSELLSELLx = []
        let SELLSELLSELLy = []
        let endValue = 0

        fetch("https://thestrategybacktester.herokuapp.com/sma")
            .then(
                function (res) {
                    return res.json()
                }
            )
            .then(
                function (data) {
                    console.log(data)
                    for (var key in data.sma.price_dict) {
                        stockChartXValuesFunction.push(key)
                        stockChartYValuesFunction.push(data.sma.price_dict[key][1])
                        stockTicker = data.sma.ticker
                        endValue = data.sma.final
                    }
                    for (var X in data.sma.price_dict) {
                        if (data.sma.price_dict[X][0] === 'BUY CREATE') {
                            BUYBUYBUYx.push(X)
                            BUYBUYBUYy.push(data.sma.price_dict[X][1])
                        }
                    }
                    for (var Y in data.sma.price_dict) {
                        if (data.sma.price_dict[Y][0] === 'SELL CREATE') {
                            SELLSELLSELLx.push(Y)
                            SELLSELLSELLy.push(data.sma.price_dict[Y][1])
                        }
                    }

                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartyValues: stockChartYValuesFunction,
                        stockSymbol: stockTicker,
                        buyX: BUYBUYBUYx,
                        buyY: BUYBUYBUYy,
                        sellX: SELLSELLSELLx,
                        sellY: SELLSELLSELLy,
                        endingValue: endValue.toLocaleString()
                    })

                }
            )
    }

    render() {
        return (
            <div className="text-center">

                <Plot
                    data={[
                        {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartyValues,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'blue' },
                        },
                        {
                            x: this.state.buyX,
                            y: this.state.buyY,
                            mode: 'markers',
                            marker: { color: 'green', size: 12 },
                            name: 'Buys'
                        },
                        {
                            x: this.state.sellX,
                            y: this.state.sellY,
                            mode: 'markers',
                            marker: { color: 'red', size: 12 },
                            name: 'Sells'
                        },
                    ]}
                    layout={{ width: 800, height: 500, title: `${this.state.stockSymbol} Simple Moving Average Strategy` }}
                />
                <h6>Starting Value</h6>
                <p>$1,000,000</p>
                <h6>Finishing Value</h6>
                <p>${this.state.endingValue}</p>
                <br />
                <h3>Strategy:</h3>
                <div className="row justify-content-center">
                    
                    <p className="col-md-3">The moving average (MA) is a simple technical analysis tool that smooths out price data by creating a constantly updated average price. The average is taken over a specific period of time, like 10 days, 20 minutes, 30 weeks or any time period the trader chooses. There are advantages to using a moving average in your trading, as well as options on what type of moving average to use.</p>
                </div>
            </div>
        )
    }
}


export default SMA