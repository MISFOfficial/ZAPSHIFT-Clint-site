import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png'
import ProFastLogo from '../Pages/shared/ProFastLogo/ProFastLogo';

const AuthLayout = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center'>
            <div className='flex flex-row justify-between border h-screen'>
                <div className='border flex-1 h-full py-12 pl-12 pr-12 lg:pr-0 flex flex-col'>
                    <div><ProFastLogo></ProFastLogo></div>
                    <div className='border h-full flex flex-col items-center justify-center'>
                        <Outlet></Outlet>
                    </div>
                </div>
                <div className='border flex-1 bg-yellow-200 py-12 hidden lg:flex items-center justify-center'>
                    <img src={authImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;