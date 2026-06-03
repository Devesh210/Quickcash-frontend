import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import { apiUrl } from "../../config/api";
const Userdashboard = () => {
    const logoutHandler = () => {
        localStorage.clear()
        window.location.href = "/";
    }

    const [myorders, setMyorders] = useState([]);
    const [mybagorders, setMybagorders] = useState([]);
    const [myelectronicorders, setMyelectronicorders] = useState([]);
    const [mywatchoffer, setMywatchoffer] = useState([]);
    const [mybagoffer, setMybagoffer] = useState([]);
    const [myelectronicoffer, setMyelectronicoffer] = useState([]);
    const [mywatchcontract, setMywatchcontract] = useState([]);
    const [mybagcontract, setMybagcontract] = useState([]);
    const [myelectroniccontract, setMyelectroniccontract] = useState([]);
    let storagedata = localStorage.getItem("user");
    let saveddata = JSON.parse(storagedata);
    let id = saveddata._id;

    const watchorder = async () => {
        let result = await fetch(apiUrl(`showorder/${id}`));
        result = await result.json();
        setMyorders(result.length);
    };

    const bagorder = async () => {
        let result = await fetch(apiUrl(`showbagorder/${id}`));
        result = await result.json();
        setMybagorders(result.length);
    };

    const electronicorder = async () => {
        let result = await fetch(apiUrl(`showelectronicsorder/${id}`));
        result = await result.json();
        setMyelectronicorders(result.length);
    };

    const watchenofforder = async () => {
        let result = await fetch(apiUrl(`watchofferorder/${id}`));
        result = await result.json();
        setMywatchoffer(result.length);
    };

    const bagenofforder = async () => {
        let result = await fetch(apiUrl(`bagofferorder/${id}`));
        result = await result.json();
        setMybagoffer(result.length);
    };

    const electronicenofforder = async () => {
        let result = await fetch(apiUrl(`electronicofferorder/${id}`));
        result = await result.json();
        setMyelectronicoffer(result.length);
    };

    const watchencontract = async () => {
        let result = await fetch(apiUrl(`watchcontractorder/${id}`));
        result = await result.json();
        setMywatchcontract(result.length);
    };

    const bagencontract = async () => {
        let result = await fetch(apiUrl(`bagcontractorder/${id}`));
        result = await result.json();
        setMybagcontract(result.length);
    };

    const electronicencontract = async () => {
        let result = await fetch(apiUrl(`electroniccontractorder/${id}`));
        result = await result.json();
        setMyelectroniccontract(result.length);
    };

    useEffect(() => {
        watchorder();
        bagorder();
        electronicorder();
        watchenofforder();
        bagenofforder();
        electronicenofforder();
        watchencontract();
        bagencontract();
        electronicencontract();
    }, []);

    return (
        <>
            <Header />
            <Container fluid className="userdashboardprofile">
                <Row>
                    <div className="col-lg-3">
                        <div className="sidebar">
                            <Link to="/Userdashboard" className="active">
                                User Dashboard
                            </Link>
                            <Link to="/MyProfile">My Profile</Link>
                            <Link to="/ChangePassword">Change Password</Link>
                            <Link to="/Viewenquiry">View Enquiry</Link>
                            <Link onClick={logoutHandler}>Logout</Link>
                        </div>
                    </div>
                    <div className="content dashhh col-lg-9">
                        <h2>User Dashboard</h2>
                        <div className="row g-6 mb-6">
                            <div className="col-xl-4 col-sm-6 col-12 mt-4">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                                                    No. of Inquiries
                                                </span>
                                                <span className="h3 font-bold">{myorders + mybagorders + myelectronicorders}</span>
                                            </div>
                                            <div className="col-auto">
                                            <div className="icon icon-shape bg-secondary text-white text-lg rounded-circle">
                                                    <i className="fa fa-question-circle" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-sm-6 col-12 mt-4">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                                                    No. of Offers
                                                </span>
                                                <span className="h3 font-bold">{mywatchoffer + mybagoffer + myelectronicoffer}</span>
                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                                                    <i className="fa fa-gift" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-sm-6 col-12 mt-4">
                                <div className="card shadow border-0">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                                                    No. of Contracts
                                                </span>
                                                <span className="h3 font-bold">{mywatchcontract + mybagcontract + myelectroniccontract}</span>
                                            </div>
                                            <div className="col-auto">
                                                <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                                                    <i className="fa fa-file" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
            <Footer />
        </>
    );
}

export default Userdashboard;
