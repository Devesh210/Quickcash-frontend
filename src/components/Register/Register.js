import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom'
import FadeLoader from "react-spinners/FadeLoader";
import swal from 'sweetalert';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { apiUrl } from "../../config/api";
// import secureStorage from "../../config/encrypt";

let usertextInput = React.createRef();
const Register = () => {

    useEffect(() => {
        document.getElementById("loadbtn").style.display = "none";
    }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();

    function ValidateEmail(e) {
        var email = usertextInput.current.value;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) || email == "") {
            setEmail(email);
            return true;
        }
        swal("Please Enter valid email address!", "", "warning");
        usertextInput.current.value = '';
        return false;
    }
    const submitHandler = async (e) => 
    {
        e.preventDefault();
        if (name == "") 
        {
            swal("Please Enter Your Name", "", "warning");
        } 
        else if (email == "") 
        {
            swal("Please Enter Valid Email Address!", "", "warning");
        } 
        else if (password == "") 
        {
            swal("Please Enter Password", "", "warning");
        } 
        else if (confirmpassword == "") 
        {
            swal("Please Enter Confirm Password", "", "warning");
        } 
        else 
        {
            if (password === confirmpassword) 
            {
                let result = await fetch(apiUrl("check_email"), {
                    method: "post",
                    body: JSON.stringify({ email }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                result = await result.json();
                if (result.email == email) 
                {
                    swal("Email ID Already Exist", "", "warning");
                } 
                else 
                {
                    document.getElementById("subbtn").style.display = "none";
                    document.getElementById("loadbtn").style.display = "block";
                    let result = await fetch(apiUrl("register"), {
                        method: "post",
                        body: JSON.stringify({
                            name,
                            email,
                            password,
                            confirmpassword,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    result = await result.json();
                    console.log(result)
                    if(result.user._id != "")
                    {
                        swal({
                            title: "Wow!",
                            text: "Registration Successfull",
                            type: "success"
                        }).then(function() {
                            localStorage.setItem("result",JSON.stringify(result.user.email))
                            window.location = "/verifyotp";
                        });
                    }
                    else
                    {
                        swal({
                            title: "Oops!",
                            text: "Something Went Wrong,Please Try Again",
                            type: "warning"
                        }).then(function() {
                            window.location = "/Register";
                        });
                    }
                }
            } 
            else 
            {
                swal("Password Does Not Match", "", "warning");
            }
        }
    };

    return (
        <>
            <Header />
            <Container className="login_abcd">
                <Row>
                    <div className='col-lg-6'>
                        <img style={{ width: '100%' }} src="https://www.getillustrations.com/packs/plastic-illustrations-scene-builder-pack/scenes/_1x/accounts%20_%20man,%20workspace,%20desk,%20laptop,%20login,%20user_md.png" />
                    </div>
                    <div className='col-lg-6'>
                        <main className="main">
                            <div className="container">
                                <section className="wrapper">
                                    <div className="heading">
                                        <h1 className="text text-large">Sign Up</h1>
                                        <p className="text text-normal">
                                            Already a User?{" "}
                                            <span>
                                                <Link to="/Login" className="text text-links">
                                                    Sign In
                                                </Link>
                                            </span>
                                        </p>
                                    </div>
                                    <form name="signin" className="form">
                                        <div className="input-control">
                                            <label htmlFor="email" className="input-label" hidden="">
                                                User Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="input-field"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter Your Username"
                                            />
                                        </div>
                                        <div className="input-control">
                                            <label htmlFor="email" className="input-label" hidden="">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="input-field"
                                                defaultvalue={email}
                                                ref={usertextInput}
                                                onBlur={ValidateEmail}
                                                placeholder="Enter Your Email Address"
                                            />
                                        </div>
                                        <div className="input-control">
                                            <label htmlFor="password" className="input-label" hidden="">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="input-field"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter Your Password"
                                            />
                                        </div>
                                        <div className="input-control">
                                            <label htmlFor="password" className="input-label" hidden="">
                                                Confirm  Password
                                            </label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="input-field"
                                                value={confirmpassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Enter Your Password Again"
                                            />
                                        </div>
                                        <div className="input-control">
                                            <button onClick={submitHandler} className="input-submit" id="subbtn" type="button">Register</button>
                                            <button className="input-submit" id="loadbtn" type="button" disabled>Loading...</button>
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </main>

                    </div>
                </Row>
            </Container>
            <Footer />
        </>
    );
}

export default Register;
