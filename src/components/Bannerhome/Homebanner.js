import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
 import banner1 from '../../Images/banner1.svg';
 import banner2 from '../../Images/banner2.png';
 import banner3 from '../../Images/banner3.png';
import { Link } from 'react-router-dom';
const state = {
    responsive: {
        0: {
            items: 1,
        },
        450: {
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
    },
}
const Homebanner = () => {
    return (
        <>
            <OwlCarousel className='owl-theme' margin={20} autoplay loop={true} nav={false} dots={false} items={3} touchDrag={true} lazyLoad={true}
                responsive={state.responsive}>
                <div class='item'>
                    <img src={banner1} />
                    <button className="ShopNow w3-animate-left"><Link to="/Sellbuyback">Sell Now</Link></button>
                </div>
                <div class='item'>
                    <img src={banner2} />
                    <button className="ShopNow w3-animate-left"><Link to="/Sellbuyback">Sell Now</Link></button>
                </div>
                <div class='item'>
                    <img src={banner3} />
                    <button className="ShopNow w3-animate-left"><Link to="/Sellbuyback">Sell Now</Link></button>
                </div>
            </OwlCarousel>
        </>
    );
}

export default Homebanner;