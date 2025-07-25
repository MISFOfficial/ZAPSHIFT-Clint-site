import React from 'react';
import { Link, Outlet } from 'react-router';
import { FaHome, FaBoxOpen, FaHistory, FaUserEdit, FaSearchLocation } from 'react-icons/fa';
import ProFastLogo from '../Pages/shared/ProFastLogo/ProFastLogo';


const DeshboardLayout = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    {/* Page content here */}
                    <div className="navbar bg-base-300 w-full lg:hidden">
                        <div className="flex items-center">
                            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </label>
                            <div className="mx-2 flex-1 px-2">Deshboard</div>
                        </div>
                    </div>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <ProFastLogo></ProFastLogo>
                        <li>
                            <Link to='/deshboard' className="flex items-center gap-2">
                                <FaHome /> Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/deshboard/myparcels' className="flex items-center gap-2">
                                <FaBoxOpen /> My Parcels
                            </Link>
                        </li>
                        <li>
                            <Link to='/deshboard/history' className="flex items-center gap-2">
                                <FaHistory /> Payment History
                            </Link>
                        </li>
                        <li>
                            <Link to='/deshboard/track_parcel' className="flex items-center gap-2">
                                <FaSearchLocation /> Track a Package
                            </Link>
                        </li>
                        <li>
                            <Link to='/deshboard/riderApproval' className="flex items-center gap-2">
                                <FaSearchLocation /> Rider Approval
                            </Link>
                        </li>
                        <li>
                            <Link to='/deshboard/profile' className="flex items-center gap-2">
                                <FaUserEdit /> Update Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DeshboardLayout;