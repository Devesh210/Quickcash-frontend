import React, { useState, useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import swal from "sweetalert";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Container, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";
import { apiUrl } from "../../config/api";

let usertextInput = React.createRef();

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  function ValidateEmail(e) {
    var email = usertextInput.current.value;
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
      email == ""
    ) {
      setEmail(email);
      return true;
    }
    swal("","Please Enter Valid Email Address!", "warning");
    usertextInput.current.value = "";
    return false;
  }

  const submitHandler = async (e) => 
    {
        e.preventDefault();
       
        if (email == "") 
        {
            swal("","Please Enter Valid Email Address!", "warning");
        } 
       
         
        else 
        {
                let result = await fetch(apiUrl("check_email"), {
                    method: "post",
                    body: JSON.stringify({ email }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                result = await result.json();
                if (result.email != email) 
                {
                    swal("","Email ID Not Registered", "warning");
                } 
                else 
                {
                   
                    let result = await fetch(apiUrl("forgotPassword"), {
                        method: "post",
                        body: JSON.stringify({
                            email
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    result = await result.json();
                    console.log(result)
                    swal("",`Password sent successfully to ${email} `, "success");
                }
              }
           
    };

  return (
    <>
      <Header />
      <Container className="login_abcd">
        <Row>
          <div className="col-lg-6">
            <img
              style={{ width: "100%" }}
              src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?b=1&s=612x612&w=0&k=20&c=9H5N9Jy8BA9yCzL-Wt5uCeZqETmpPYsJKJ2Nh1-SDaw="
            />
          </div>
          <div className="col-lg-6">
            <main className="main">
              <div className="container">
                <section className="wrapper">
                  <div className="heading">
                    <h1 className="text text-large">Forgot Password</h1>
                    <p className="text text-normal">
                      Enter your email to reset your password
                    </p>
                  </div>
                  <form name="signin" className="form">
                    <div className="input-control">
                      {/* <label htmlFor="email" className="input-label" hidden="">
                        Email Address
                      </label> */}
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
                      <button
                        onClick={submitHandler}
                        className="input-submit"
                        id="submitbtn"
                        type="button"
                      >
                        Send
                      </button>
                    </div>
                    <div>
                      <Link to={"/Login"}>Back To Login</Link>
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
};

export default ForgotPassword;
