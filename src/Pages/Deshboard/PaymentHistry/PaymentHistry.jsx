import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistry = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { isPending, isLoading, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`payments?email=${user.email}`);
            return res.data
        }
    })

    if (isPending || isLoading) {
        return 'loading......'
    }

    console.log(payments)

    return (
        <div className="max-w-7xl mx-auto mt-8 px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Payment History</h2>

            {/* Desktop & Tablet Table */}
            <div className="hidden md:block overflow-x-auto rounded-lg shadow ring-1 ring-gray-200">
                <table className="min-w-full divide-y divide-gray-200 bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap">Transaction ID</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount (৳)</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment Method</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Paid At</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap">Parcel ID</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {payments.map((payment) => (
                            <tr key={payment.transactionId} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-blue-600 font-mono break-all">{payment.transactionId}</td>
                                <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{payment.amount}৳</td>
                                <td className="px-4 py-3 text-sm text-gray-700 capitalize">{payment.paymentMethod}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                    {new Date(payment.paidAt).toLocaleString()}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700 break-all">{payment.parcelId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden space-y-4">
                {payments.map((payment) => (
                    <div
                        key={payment.transactionId}
                        className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
                    >
                        <p className="text-sm text-gray-500">Transaction ID:</p>
                        <p className="text-sm text-blue-600 font-mono break-all">{payment.transactionId}</p>

                        <div className="flex justify-between mt-2 text-sm">
                            <span className="text-gray-700 font-semibold">Amount:</span>
                            <span>{payment.amount}৳</span>
                        </div>

                        <div className="flex justify-between mt-1 text-sm">
                            <span className="text-gray-700 font-semibold">Method:</span>
                            <span className="capitalize">{payment.paymentMethod}</span>
                        </div>

                        <div className="flex justify-between mt-1 text-sm">
                            <span className="text-gray-700 font-semibold">Paid At:</span>
                            <span className="text-right">{new Date(payment.paidAt).toLocaleString()}</span>
                        </div>

                        <div className="mt-1 text-sm text-gray-700">
                            <p className="font-semibold">Parcel ID:</p>
                            <p className="break-all">{payment.parcelId}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentHistry;