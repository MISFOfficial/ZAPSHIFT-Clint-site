import React from 'react';
import BanlgadeshMap from './BanlgadeshMap';
import { useLoaderData } from 'react-router';

const Coverage = () => {

    const data = useLoaderData()

    return (
        <div className='py-10'>
            <h1 className='text-3xl font-bold mb-6'>
                We are avilable in 64 districts
            </h1>
            <BanlgadeshMap data={data}></BanlgadeshMap>
        </div>
    );
};

export default Coverage;