import React, { Component } from 'react'

export default class CompanyInfo extends Component {
    state= {
        loading: true
    }

    async componentDidMount() {
        const url = 'https://thestrategybacktester.herokuapp.com/company_info';
        const res = await fetch(url);
        const data = await res.json();
        this.setState({ company: data, loading: false })
        console.log(this.state.company)
    }
    
    
    
    
    render() {
        return (
            <div>
                {this.state.loading ? (<div className="spinner-border text-success"></div>) : (
                <div className="m-4">
                        <h1>{this.state.company.Symbol}: {this.state.company.Name}</h1>
                        <p><strong>Description</strong>: {this.state.company.Description}</p>
                        <div  className="row m-5">
                            <div className="col-md-4 text-left">
                                <p><strong>Beta</strong>: {this.state.company.Beta}</p>
                                <p><strong>52WeekHigh</strong>: {this.state.company['52WeekHigh']}</p>
                                <p><strong>52WeekLow</strong>: {this.state.company['52WeekLow']}</p>
                                <p><strong>200DayMovingAverage</strong>: {this.state.company['200DayMovingAverage']}</p>
                                <p><strong>AnalystTargetPrice</strong>: {this.state.company.AnalystTargetPrice}</p>
                                <p><strong>DividendDate</strong>: {this.state.company.DividendDate}</p>
                                <p><strong>DividendYield</strong>: {this.state.company.DividendYield}</p>
                                <p><strong>EPS</strong>: {this.state.company.EPS}</p>
                                
                            </div>
                            <div className="col-md-4 text-left">
                                <p><strong>PERatio</strong>: {this.state.company.PERatio}</p>
                                <p><strong>TrailingPE</strong>: {this.state.company.TrailingPE}</p>
                                <p><strong>ForwardPE</strong>: {this.state.company.ForwardPE}</p>
                                <p><strong>PEGRatio</strong>: {this.state.company.PEGRatio}</p>
                                <p><strong>PriceToBookRatio</strong>: {this.state.company.PriceToBookRatio}</p>
                                <p><strong>PriceToSalesRatioTTM</strong>: {this.state.company.PriceToSalesRatioTTM}</p>
                                <p><strong>ShortPercentFloat</strong>: {this.state.company.ShortPercentFloat}</p>
                                <p><strong>ShortRatio</strong>: {this.state.company.ShortRatio}</p>
                            </div>
                            <div className="col-md-4 text-left">
                                <p><strong>BookValue</strong>: {this.state.company.BookValue}</p>
                                <p><strong>EBITDA</strong>: {this.state.company.EBITDA}</p>
                                <p><strong>EVToEBITDA</strong>: {this.state.company.EVToEBITDA}</p>
                                <p><strong>EVToRevenue</strong>: {this.state.company.EVToRevenue}</p>
                                <p><strong>MarketCapitalization</strong>: {this.state.company.MarketCapitalization}</p>
                                <p><strong>Sector</strong>: {this.state.company.Sector}</p>
                                <p><strong>Industry</strong>: {this.state.company.Industry}</p>
                                <p><strong>AssetType</strong>: {this.state.company.AssetType}</p>
                            </div>
                        </div>
                        
                </div>
                )}
            </div>
        )
    }
}
