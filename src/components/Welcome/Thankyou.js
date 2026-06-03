import React, { useState, useEffect } from "react";
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import thankyou from "../../Images/thankyou.svg"
const Thankyou = () => {
    const watchenquiryid = sessionStorage.getItem('watchenquiryid');
    const bagenquiryid = sessionStorage.getItem('bagenquiryid');
    const elecenquiryid = sessionStorage.getItem('elecenquiryid');
    return (
        <>
            <Header />
            <div className="thankyou">
                <div className="wrapper container">
                    <Row style={{ justifyContent: 'center', marginTop: '65px', marginBottom: '65px' }}>
                        <div className="col-lg-5">
                            <form action="#" className="card-content">
                                <div className="container">
                                    <img src={thankyou} />
                                    <p>You will be contacted shortly</p>
                                    {watchenquiryid ? (
                                        <p>Your Enquiry Id is <span>{watchenquiryid}</span></p>
                                    ) : bagenquiryid ? (
                                        <p>Your Enquiry Id is <span>{bagenquiryid}</span></p>
                                    ) : elecenquiryid ? (
                                        <p>Your Enquiry Id is <span>{elecenquiryid}</span></p>
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                                <div className="form-input">
                                    <button className="subscribe-btn Home_abcd"><Link to="/">Sell Another Product</Link></button>
                                </div>
                            </form>
                        </div>
                    </Row>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Thankyou;