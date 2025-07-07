import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../Loader/Loading';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const PaymentForm = () => {

    const { user } = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null)
    const { parcelId } = useParams()
    const navigate = useNavigate()

    const axiosSecure = useAxiosSecure()

    const { isPending, data: parcelInfo } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data;
        }
    })

    console.log(parcelInfo)
    const amount = parcelInfo?.cost;

    const amountInCents = amount * 100;
    console.log(amountInCents);

    if (isPending) {
        return <Loading></Loading>
    }

    console.log(parcelId)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log(error)
            setError(error.message)
        }
        else {
            console.log(paymentMethod)
            setError(null)
            // create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                parcelId
            })

            console.log(res)
            const clientSecret = res.data.clientSecret

            // Step 3 confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            });

            console.log(result)
            if (result.error) {
                console.log(result.error.message);
                setError(result.error.message)
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded!');
                    console.log(result)
                    // mark parcl paind alsi create payment histry
                    const transactionId = result.paymentIntent.id;
                    const paymentData = {
                        parcelId,
                        email: user.email,
                        amount,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }
                    // console.log(paymentData)
                    const paymentRespons = await axiosSecure.post('/payments', paymentData);
                    console.log(paymentRespons)
                    console.log(paymentRespons.data)
                    if (paymentRespons.data.insertedId) {
                        await Swal.fire({
                            title: 'Great',
                            text: 'Your payment has been sucsessfull',
                            html: `<strong>Transection ID:</strong> <code>${transactionId}</code>`,
                            icon: 'success',
                            confirmButtonText:'Go to My Parcels'
                        })
                        navigate('/deshboard/myparcels')
                    }

                }
            }
        }


        // create payment intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            parcelId
        })

        // console.log(res)
        const clientSecret = res.data.clientSecret

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user?.displayName
                },
            },
        });

        console.log(result)
        if (result.error) {
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment succeeded!');
                console.log(result)
            }
        }
    }

    return (
        <div className="mx-130 bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-10">

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-4 rounded-md border border-gray-300 shadow-inner bg-gray-50 transition-all focus-within:border-blue-500">
                    <CardElement>
                    </CardElement>
                </div>
                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Pay ${amount}
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }

            </form>
        </div>
    );
};

export default PaymentForm;