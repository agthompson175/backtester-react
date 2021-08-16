import React, { Component } from 'react'
import Plot from 'react-plotly.js'

class MACD extends Component {
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

        fetch("https://thestrategybacktester.herokuapp.com/MACD")
            .then(
                function (res) {
                    return res.json()
                }
            )
            .then(
                function (data) {
                    console.log(data)
                    for (var key in data.macd.macd_dict) {
                        stockChartXValuesFunction.push(key)
                        stockChartYValuesFunction.push(data.macd.macd_dict[key][1])
                        stockTicker = data.macd.ticker
                        endValue = data.macd.final
                    }
                    for (var X in data.macd.macd_dict) {
                        if (data.macd.macd_dict[X][0] === 'BUY CREATE') {
                            BUYBUYBUYx.push(X)
                            BUYBUYBUYy.push(data.macd.macd_dict[X][1])
                        }
                    }
                    for (var Y in data.macd.macd_dict) {
                        if (data.macd.macd_dict[Y][0] === 'SELL CREATE') {
                            SELLSELLSELLx.push(Y)
                            SELLSELLSELLy.push(data.macd.macd_dict[Y][1])
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
                    layout={{ width: 800, height: 500, title: `${this.state.stockSymbol} Moving Average Convergence Divergence (MACD)` }}
                />
                <h6>Starting Value</h6>
                <p>$1,000,000</p>
                <h6>Finishing Value</h6>
                <p>${this.state.endingValue}</p>
                <h3>Strategy:</h3>
                <div className="row justify-content-center">
                    <p className="col-md-3">The strategy is to buy – or close a short position – when the MACD crosses above the zero line, and sell – or close a long position – when the MACD crosses below the zero line. This method should be used carefully, as the delayed nature means that fast, choppy markets would often see the signals issued too late.</p>
                </div>
            </div>
        )
    }
}


export default MACD