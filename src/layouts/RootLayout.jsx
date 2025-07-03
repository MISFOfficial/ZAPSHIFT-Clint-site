import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/shared/Navbar/Navbar';
import Footer from '../Pages/shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='min-h-screen flex flex-col max-w-[1280px] mx-auto'>
            <Navbar></Navbar>
            <div className='flex-1 flex flex-col justify-center'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;