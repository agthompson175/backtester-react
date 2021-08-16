// import React, { useEffect, useState } from 'react'
// import Plot from 'react-plotly.js'

// function SMA() {

//     const [sma, setSma] = useState([])

    


//     useEffect(() => {
//         // fetch("/sma_data").then(response => {
//         //     console.log('hello')
//         //     response.json()).then(data => {
//         //         setSma(data.sma)
//         //         console.log(data);
//         //     })
//         // });
//         fetch("/sma_data")
//             .then(response => response.json())
//             .then(data => setSma(data.sma))
//             .then(console.log(sma))
//     }, []);

    
    
//     return (
//         <div>
//             <Plot
//                 data={[
//                     {
//                         x: [1],
//                         y: [5],
//                         type: 'scatter',
//                         mode: 'lines+markers',
//                         marker: { color: 'green' },
//                     },
//                 ]}
//                 layout={{ width: 800, height: 500, title: 'sma' }}
//             />
            
//         </div>
//     )
// }

// export default SMA
import React, { Component } from 'react'
import Plot from 'react-plotly.js'

class Simple extends Component {
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

        fetch("https://thestrategybacktester.herokuapp.com/simple_data")
            .then(
                function (res) {
                    return res.json()
                }
            )
            .then(
                function (data) {
                    console.log(data)
                    for (var key in data.simple.price_dict) {
                        stockChartXValuesFunction.push(key)
                        stockChartYValuesFunction.push(data.simple.price_dict[key][1])
                        stockTicker = data.simple.ticker
                        endValue = data.simple.final
                    }
                    for (var X in data.simple.price_dict) {
                       if (data.simple.price_dict[X][0] === 'BUY CREATE') {
                             BUYBUYBUYx.push(X)
                             BUYBUYBUYy.push(data.simple.price_dict[X][1])}}
                    for (var Y in data.simple.price_dict) {
                        if (data.simple.price_dict[Y][0] === 'SELL CREATED') {
                            SELLSELLSELLx.push(Y)
                            SELLSELLSELLy.push(data.simple.price_dict[Y][1])
                        }
                    }

                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartyValues: stockChartYValuesFunction,
                        stockSymbol : stockTicker,
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
                            name: 'BTD'
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
                    layout={{ width: 1000, height: 500, title: `${this.state.stockSymbol} Simple "Buy The Dip" Strategy` }}
                />
                <h6>Starting Value</h6>
                <p>$1,000,000</p>
                <h6>Finishing Value</h6>
                <p>${this.state.endingValue}</p>
                <br />
                <h3>Strategy:</h3>
                <div className="row justify-content-center">  
                    
                    <p className="col-md-3">"Buy the dips" means purchasing an asset after it has dropped in price. The belief here is that the new lower price represents a bargain as the "dip" is only a short-term blip and the asset, with time, is likely to bounce back and increase in value.</p>
                </div>
            </div>
        )
    }
}


export default Simple