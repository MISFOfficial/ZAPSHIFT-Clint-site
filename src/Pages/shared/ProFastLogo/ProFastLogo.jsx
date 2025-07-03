import React from 'react';
import logo from '../../../assets/logo.png'

const ProFastLogo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-2' src={logo} alt="" />
            <p className='font-bold -ml-2  text-3xl'>Profast</p>
        </div>
    );
};

export default ProFastLogo;