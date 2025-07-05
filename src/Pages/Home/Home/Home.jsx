import React from 'react';
import Banner from '../Banner/Banner';


const Home = () => {
    return (
        <div className='relative hero'>
            <div className='relative'>
                <Banner></Banner>
                <div className='bg-[#00000023] absolute top-0 h-full w-full rounded-4xl'></div>
            </div>
            <button className='bg-white cursor-pointer p-4 rounded-sm absolute bottom-1/6 left-1/2 transform -translate-x-1/2 -translate-y-1/6 hover:scale-120 duration-500'>Explore More</button>
        </div>
    );
};

export default Home;