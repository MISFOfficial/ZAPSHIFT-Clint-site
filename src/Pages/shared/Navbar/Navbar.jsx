import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import ProFastLogo from '../ProFastLogo/ProFastLogo';
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {

    const {user, logout}=useAuth()

    const navItems = <>
        <li><NavLink to='/'>Home</NavLink></li>
        {user && <li><NavLink to='/sendparcel'>Send Parcel</NavLink></li>}
        <li><NavLink to='/coverage'>Coverage</NavLink></li>
        {user && <li><NavLink to='/deshboard'>Deshboard</NavLink></li>}
        <li><NavLink to='/about'>About Us</NavLink></li>
    </>

    const navigate=useNavigate()

    const handleLogout=()=>{
        logout()
        .then(() => {
            navigate('/login')
        }).catch(() => {
            alert('error')
        });
    }

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm px-20">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navItems}
                        </ul>
                    </div>
                    <a className=""><ProFastLogo></ProFastLogo></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <button onClick={handleLogout} className='btn bg-green-500'>Logout</button> : <Link to='/login'><button className='btn bg-green-500'>LogIn</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;