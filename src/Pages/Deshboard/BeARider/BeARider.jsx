import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router';

const BeARider = () => {
    const { register, handleSubmit, watch, reset, formState: {errors} } = useForm();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const serviceCenters = useLoaderData();

    const selectedRegion = watch("region");

    console.log(errors)

    // ✅ Get unique regions
    const uniqueRegions = [...new Set(serviceCenters.map(item => item.region))];

    // ✅ Get districts based on selected region
    const getDistrictsByRegion = (region) => {
        return serviceCenters
            .filter(item => item.region === region)
            .map(item => item.district);
    };

    const onSubmit = async (data) => {
        const riderData = {
            ...data,
            status: "pending",
            created_by: user?.email,
            created_at: new Date()
        };
        console.log(riderData)

        try {
            const res = await axiosSecure.post('/riders', riderData);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Application Submitted!',
                    text: 'Your rider request is under review.',
                    timer: 2000,
                    showConfirmButton: false
                });
                reset();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Please try again later.'
            });
        }
    };

    return (
        <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Rider Registration</h2>
                    <p className="text-gray-500">Please fill out all required fields</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input {...register("name", { required: true })} placeholder="Full Name" className="input input-bordered w-full" />
                    <input {...register("email", { required: true })} placeholder="Email" type="email" className="input input-bordered w-full" />
                    <input {...register("age", { required: true })} placeholder="Age" type="number" className="input input-bordered w-full" />
                    <input {...register("phone", { required: true })} placeholder="Phone Number" className="input input-bordered w-full" />
                    <input {...register("nid", { required: true })} placeholder="NID Number" className="input input-bordered w-full" />

                    {/* ✅ Region Dropdown */}
                    <select {...register("region", { required: true })} className="select select-bordered w-full">
                        <option value="">Select Region</option>
                        {uniqueRegions.map((region, i) => (
                            <option key={i} value={region}>{region}</option>
                        ))}
                    </select>

                    {/* ✅ District Dropdown */}
                    <select {...register("district", { required: true })} className="select select-bordered w-full">
                        <option value="">Select District</option>
                        {getDistrictsByRegion(selectedRegion).map((district, i) => (
                            <option key={i} value={district}>{district}</option>
                        ))}
                    </select>

                    <input {...register("bikeBrand", { required: true })} placeholder="Bike Brand" className="input input-bordered w-full" />
                    <input {...register("bikeRegistration", { required: true })} placeholder="Bike Registration Number" className="input input-bordered w-full col-span-2" />
                </div>

                <div>
                    <textarea {...register("additionalInfo")} placeholder="Additional Information (optional)" className="textarea textarea-bordered w-full" />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn bg-black text-white w-full">Submit Application</button>
                </div>
            </form>
        </div>
    );
};

export default BeARider;
