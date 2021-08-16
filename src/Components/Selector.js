import React, { useState } from 'react'

export const Selector = () => {

    const [ticker, setTicker] = useState("");
    const [size, setSize] = useState("");

    


    return (
        <div className="col-md-8 m-4">
            
            <div className="jumbotron">
                <h1 className="display-4">Welcome to Backtester!</h1>
                <hr className="my-4" />
                <p className="lead">Select your desired stock and time frame below, then browse the tabs above to see how your favorite trading strategies have performed</p>
            </div>

            <form >
                <div className="form-group mx-sm-3 mb-2 mt-5">
                        <label >Ticker</label>
                        <select className="custom-select custom-select-lg mb-3" name="ticker" onChange={e => setTicker(e.target.value)}>
                            <option value>SELECT TICKER</option>
                            <option value="SPY">Apple (AAPL)</option>
                            <option value="MSFT">Microsoft (MSFT)</option>
                            <option value="GOOG">Google (GOOG)</option>
                            <option value="FB">Facebook (FB)</option>
                            <option value="TSLA">Tesla (TSLA)</option>
                            <option value="ROKU">Roku (ROKU)</option>
                            <option value="SPY">SP500 (SPY)</option>
                        </select>
                        <label>Data Size</label>
                    <select className="custom-select custom-select-lg mb-3" name="size" onChange={e => setSize(e.target.value)}>
                            <option value>DATA SIZE</option>
                            <option value="full">Full (historic)</option>
                            <option value="compact">100 Day</option>
                        </select>
                    <button type="submit" className="btn btn-secondary btn-lg" onClick={async () => {
                            const stock = { ticker, size };
                            const response = await fetch("https://thestrategybacktester.herokuapp.com/inputs", {
                                method: "POST",
                                headers: {
                                    "content-Type": "application/json"
                                }, 
                                body: JSON.stringify(stock)
                            });
                            if (response.ok) {
                                console.log("response worked!!!!")
                            }
                        }}>Submit</button>
                    </div>
            </form>
        </div>
    )
}
