import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


export const Navbar = () => {
    
    const { currentUser } = useAuth()
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand" to=".">Backtester</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/info">Company Info</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/btd">Buy The Dip</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/MACD">MACD</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/sma">Simple Mov Avg</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/buy_data"><strong>Unlimited Data</strong></Link>
                    </li>
                </ul>
                <li className="nav-item dropdown nav pull-right">
                    <Link className="nav-link dropdown-toggle" to="." id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        &#128100; Profile
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        {
                        currentUser
                            ?
                            <Link className="nav-link" to="/profile">Profile</Link>
                            :
                            <div><Link className="nav-link" to="/signup">Signup</Link>
                            <Link className="nav-link" to="/login">Log In</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="nav-link" to="/profile">Profile</Link></div>
                        }</div>
                </li>
                
            </div>
        </nav>

            )
}
