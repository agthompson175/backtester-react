import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
//import { useAuth } from '../contexts/AuthContext'
//import { Link, useHistory } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
    "pk_test_51JNpMLCMYGTZwWYifvoOxDYEhf1BTmYO9vuIKTp49n6N2ugEg1tWpYqw2sQTKXWtHSMyh87LYyw4h38yYo8OGYYn00VtyfPPEC"
)

export default function Stripe() {
    
    //const { currentUser } = useAuth()
    const [stripeError, setStripeError] = useState()
    const [loading, setLoading] = useState()
     
    
    
    

    const handleClick = async () => {
        setLoading(true)

        const stripe = await stripePromise


        const { error } = await stripe.redirectToCheckout({
            lineItems: [
                {
                    price: "price_1JNqrvCMYGTZwWYiSY76daxl", 
                    quantity: 1,
                },
            ],
            mode: "payment", 
            cancelUrl: window.location.origin,
            successUrl: window.location.origin,
        });
        if (error) {
            setLoading(false)
            setStripeError(error)
        }
    }




    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Unlimited Tickers</h2>
                    {stripeError && <Alert variant="danger">{stripeError}</Alert>}
                    <img className="ml-3 mb-2" src="stockdata.jpeg" alt="stockdata" style={{ height: "200px" }}/>
                    <p className="text-center"><strong>Access to:</strong> Any US ticker and full access to all historic data for your backtesting pleasure</p>
                    
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button  disabled={loading} onClick={handleClick}>Purchase: $5.99</Button>
            </div>
        </>
        
    )
}
