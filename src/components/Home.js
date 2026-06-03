import React from 'react';
import Homebanner from './Bannerhome/Homebanner';
import Faq from './common/Faq';
import Footer from './common/Footer';
import Header from './common/Header';
import Howitworks from './Howitworks';
import Ourpriority from './Ourpriority';
import Services from './Services/Services';
import Testimonials from './Testimonials';
const Home = () => {
    return (
        <>
        <Header/>
        <Homebanner/>
        <Services/>
        <Howitworks/>
        <Ourpriority/>
        <Testimonials/>
        <Faq/>
        <Footer/>
        </>
    );
}

export default Home;