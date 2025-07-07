import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromse = loadStripe(import.meta.env.VITE_paymentKey)

const Payment = () => {
    return (
        <Elements stripe={stripePromse}>
            <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default Payment;