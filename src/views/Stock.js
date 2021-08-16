import React, {Component} from 'react'
import Plot from 'react-plotly.js'
import  {Selector}  from '../Components/Selector'

class Stock extends Component {
    state = {
        

        }
    
    componentDidMount() {
        this.fetchStock()
    }

    fetchStock() {
        const pointerToThis = this
        
        let stockTicker = ''
        let dateValues = []
        let closeValues = []
        let highValues = []
        let lowValues = []
        let openValues = []

        fetch("https://thestrategybacktester.herokuapp.com/chart_data")
            .then(
                function (res) {
                    return res.json()
                }
            )
            .then(

                function (data) {
                    //console.log(data)
                    for (var key in data['Time Series (Daily)']) {
                        dateValues.push(key)
                        closeValues.push(data['Time Series (Daily)'][key]['4. close'])
                        highValues.push(data['Time Series (Daily)'][key]['2. high'])
                        lowValues.push(data['Time Series (Daily)'][key]['3. low'])
                        openValues.push(data['Time Series (Daily)'][key]['1. open'])
                    

                    }
                    stockTicker = data['Meta Data']['2. Symbol']
                    // console.log(openValues)
                    pointerToThis.setState({
                        trace1: {
                            x: dateValues,
                            close: closeValues,
                            decreasing: { line: { color: 'red' } },
                            high: highValues,
                            increasing: { line: { color: 'green' } },
                            line: { color: 'rgba(31,119,180,1)' },
                            low: lowValues,
                            open: openValues,


                            type: 'candlestick',
                            xaxis: 'x',
                            yaxis: 'y'
                        },
                        layout: {
                            title: stockTicker,
                            dragmode: 'zoom',
                            margin: {
                                r: 10,
                                t: 25,
                                b: 40,
                                l: 60
                            },
                            showlegend: false,
                            xaxis: {
                                autorange: true,
                                domain: [0, 1],
                                range: [dateValues[0], dateValues[-1]],
                                rangeslider: { range: [dateValues[0], dateValues[-1]] },
                                title: 'Date',
                                type: 'date'
                            },
                            yaxis: {
                                autorange: true,
                                domain: [0, 1],
                                range: [Math.max(highValues), Math.min(lowValues)],
                                type: 'linear',
                                title: 'Price'
                            }, 
                        }
                    })

                })

    }

    render() {
        return(
            <div className = "row justify-content-center">
                <Selector />
               
                <Plot
                    data={[this.state.trace1]}
                    layout={this.state.layout}
                />
            </div>
        )
    }
}


export default Stock