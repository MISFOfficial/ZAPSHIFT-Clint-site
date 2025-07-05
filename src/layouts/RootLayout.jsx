import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/shared/Navbar/Navbar';
import Footer from '../Pages/shared/Footer/Footer';
import useAuth from '../Hooks/useAuth';
import Loading from '../Pages/Loader/Loading';

const RootLayout = () => {

    const { loading } = useAuth()

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar></Navbar>
            <div className='flex-1 flex flex-col justify-center py-5 px-20'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;