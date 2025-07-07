import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data
        }
    })

    console.log(parcels)

    // const id = parcels._id
    // console.log(id)

    const handleDelete = async (id) => {
        console.log(id)
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this parcel!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e3342f',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!',
        });
        if (result.isConfirmed) {
            axiosSecure.delete(`parcels/${id}`)
                .then(res => {
                    console.log(res.data)
                    if (res.data.success == true) {
                        Swal.fire({
                            title: 'Delete',
                            icon: 'success',
                            text: 'Successfully deleted',
                            timer: 1500,
                            showConfirmButton: false
                        })
                    }
                    refetch();
                })
        }
    };

    // Payment funtionility
    const handlePay = (id) => {
        console.log('payment id', id)
        navigate(`/deshboard/payment/${id}`)
    }

    return (
        <div className="p-5 overflow-x-auto rounded-lg shadow-md mt-5 h-full ">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">#</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Type</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created At</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Cost</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Payment</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {parcels?.map((parcel, index) => (
                        <tr key={parcel._id} className="hover:bg-gray-50 transition duration-150">
                            <td className="px-4 py-2 text-sm text-gray-600">
                                {index + 1}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">
                                {parcel.type === 'document' ? 'Document' : 'Non-document'}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600">
                                {new Date(parcel.creation_date).toLocaleString()}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">{parcel.cost}৳</td>
                            <td className="px-4 py-2 text-sm">
                                <span
                                    className={`px-2 py-1 rounded text-white font-semibold ${parcel.payment_status === 'paid' ? 'bg-green-500' : 'bg-red-500'
                                        }`}
                                >
                                    {parcel.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                                </span>
                            </td>
                            <td className="px-4 py-2 text-sm space-x-2">
                                <button

                                    className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    View
                                </button>
                                <button disabled={parcel.payment_status === 'paid' ? true : false}
                                    onClick={() => handlePay(parcel._id)}
                                    className={`${parcel.payment_status==='paid'? 'cursor-not-allowed bg-green-800' : 'cursor-pointer bg-green-500 hover:bg-green-600'}  text-white px-3 py-1 rounded `}
                                >
                                    Pay
                                </button>
                                <button
                                    onClick={() => handleDelete(parcel._id)}
                                    className=" cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        // <div>dfasd</div>
    );
};

export default MyParcels;