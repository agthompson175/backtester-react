import React from 'react'
import Stock from './views/Stock'
import './App.css'
import {Navbar} from './Components/Navbar'
import Simple from './views/Simple'
import SMA from './views/SMA'
import Signup from './Components/Signup'
import Dashboard from './Components/Dashboard'
import CompanyInfo from './views/CompanyInfo'
import Login from './Components/Login'
import { BrowserRouter, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './Components/PrivateRoute'
import Stripe from './Components/Stripe'
import MACD from './views/MACD'


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
      
        <Navbar />
          <div className="Container">
            
            <Route exact path="/" component={Stock} />
            <PrivateRoute path="/btd" component={Simple} />
            <PrivateRoute path="/sma" component={SMA} />
            <PrivateRoute path="/MACD" component={MACD} />
            <Route path="/info" component={CompanyInfo}/>
            <div className="container align-items-center justify-content-center mt-5" style={{ maxWidth: '400px' }}>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/buy_data" component={Stripe} />
              <PrivateRoute path="/profile" component={Dashboard} />
            </div>


          </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
