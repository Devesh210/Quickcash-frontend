import React from 'react';
import { Container, Row } from 'react-bootstrap';
import watch from '../../Images/watch.svg'
import bag from '../../Images/bag.svg'
import electronics from '../../Images/electronics.svg'
import nft from '../../Images/nft.svg'
import { Link } from 'react-router-dom';
import comingsoon from '../../Images/comingsoon.png'
const Services = () => {
    const tok = localStorage.getItem('token');
    const token = tok == null ? '/Login' : '/Watch';
    const token1 = tok == null ? '/Login' : '/Bag';
    const token2 = tok == null ? '/Login' : '/Electronics';
    const token3 = tok == null ? '/Login' : '#';
    return (
        <>
            <Container fluid className='our_Servicess'>
                <h2 className='our_services'>
                    Our Services
                </h2>
                <p className='description'>What you would like to sell</p>
                <Row>
                    <div className='col-lg-3 serr'>
                        <Link to={token}>
                            <div className='services_qc'>
                                <h3 className='serv_a'>Luxury Watch</h3>
                                <img className='watchs' src={watch} />
                            </div>
                        </Link>
                    </div>
                    <div className='col-lg-3 serr'>
                        <Link to={token1}>
                            <div className='services_qc'>
                                <h3 className='serv_a'>Luxury Bag</h3>
                                <img className='watchs' src={bag} />
                            </div>
                        </Link>
                    </div>
                    <div className='col-lg-3 serr'>
                        <Link to={token2}>
                            <div className='services_qc'>
                                <h3 className='serv_a'>Electronics</h3>
                                <img className='watchs' src={electronics} />
                            </div>
                        </Link>
                    </div>
                    <div className='col-lg-3 serr'>
                        <img style={{position: 'absolute',right: '12px'}} src={comingsoon} />
                        <Link to={token3}>
                            <div className='services_qc'>
                                <h3 className='serv_a'>Digital Assets</h3>
                                <img className='watchs' src={nft} />
                            </div>
                        </Link>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default Services;