import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../../assets/banner/banner1.png'
import banner2 from '../../../assets/banner/banner2.png'
import banner3 from '../../../assets/banner/banner3.png'

const Banner = () => {
    return (
        <div>
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={2000}
                showThumbs={false}
                stopOnHover={true}
                showArrows={false}
                transitionTime={700}
                showStatus={false}
                
            >
                <div>
                    <img src={banner1} alt="" />
                </div>
                <div>
                    <img src={banner2} alt="" />
                </div>
                <div>
                    <img src={banner3} alt="" />
                </div>
            </Carousel>
            {/* <div className='bg-[#05050537] absolute top-0 h-full w-full'></div> */}
        </div>
    );
};

export default Banner;