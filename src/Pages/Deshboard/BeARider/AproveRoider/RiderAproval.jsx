import React from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const RiderApproval = () => {
    const axiosSecure = useAxiosSecure();

    const { isPending, isLoading, data: riders = [], refetch } = useQuery({
        queryKey: ['rider-approval'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/pending');
            return res.data;
        }
    });

    const handleStatusChange = async (id, action) => {
        const actionText = action === 'approved' ? 'approve' : 'cancel';
        const confirm = await Swal.fire({
            title: `Are you sure you want to ${actionText} this rider?`,
            text: action === 'approved'
                ? 'The rider will be approved and added to the system.'
                : 'This will permanently remove the rider application.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Yes, ${actionText}`,
            cancelButtonText: 'No',
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/riders/${id}/status`, {
                status: action === 'approved' ? 'approved' : 'rejected'
            });
            Swal.fire('success', `Rider${action} Successfully`, 'success');
            refetch();

        } catch (error) {
            console.error('Status update failed:', error);
            Swal.fire('Error', 'Something went wrong.', 'error');
        }
    };



    const showDetails = (rider) => {
        const detailHTML = `
            <div style="text-align: left">
                <p><strong>Name:</strong> ${rider.name}</p>
                <p><strong>Email:</strong> ${rider.email}</p>
                <p><strong>Phone:</strong> ${rider.phone}</p>
                <p><strong>Age:</strong> ${rider.age}</p>
                <p><strong>NID:</strong> ${rider.nid}</p>
                <p><strong>District:</strong> ${rider.district}</p>
            <p><strong>Apply Date:</strong> ${new Date(rider.created_at).toLocaleDateString('en-GB',)}</p>
                <p><strong>Bike Brand:</strong> ${rider.bikeBrand}</p>
                <p><strong>Bike Registration:</strong> ${rider.bikeRegistration}</p>
                <p><strong>Additional Info:</strong> ${rider.additionalInfo || 'N/A'}</p>
            </div>
        `;
        Swal.fire({
            title: 'Rider Details',
            html: detailHTML,
            confirmButtonText: 'Close',
            width: 600
        });
    };

    if (isLoading || isPending) {
        return <p className="text-center p-6">Loading pending riders...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Pending Rider Applications</h2>
            {riders.length === 0 ? (
                <p>No pending applications found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>District</th>
                                <th>Apply Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {riders.map((rider) => (
                                <tr key={rider._id}>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.phone}</td>
                                    <td>{rider.district}</td>
                                    <td>{new Date(rider.created_at).toLocaleDateString('en-GB',)}</td>
                                    <td className="space-x-1">
                                        <button
                                            onClick={() => showDetails(rider)}
                                            className="btn btn-info btn-sm"
                                        >
                                            Details
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(rider._id, 'approved')}
                                            className="btn btn-success btn-sm"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(rider._id, 'cancelled')}
                                            className="btn btn-error btn-sm"
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RiderApproval;
