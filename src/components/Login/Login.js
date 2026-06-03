import React, { useState } from "react";
import swal from "sweetalert";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { apiUrl } from "../../config/api";
import { storage } from "../../config/storage";



const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      let result = await fetch(apiUrl("login"), {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();

      console.log(result);

      const responseData = result || {};
      const authToken = responseData.token;
      const user = responseData.user;

      if (authToken && user) {
        storage.setUser(user);
        storage.setToken(authToken);
        window.location.href = "/";
        return;
      }

      swal("Please Enter Correct Details", "", "warning");
    } catch (error) {
      console.log(error);
      swal("Login failed. Please try again.", "", "warning");
    } finally {
      setLoading(false);
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
                    <h1 className="text text-large">Sign In</h1>
                    <p className="text text-normal">
                      New user?{" "}
                      <span>
                        <Link to="/Register" className="text text-links">
                          Create an account
                        </Link>
                      </span>
                    </p>
                  </div>
                  <form name="signin" className="form">
                    <div className="input-control">
                      <label htmlFor="email" className="input-label" hidden="">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="input-field"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email"
                      />
                    </div>
                    <div className="input-control">
                      <label
                        htmlFor="password"
                        className="input-label"
                        hidden=""
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your password"
                      />
                    </div>
                    <div className="input-control">
                      <button
                        onClick={submitHandler}
                        className="input-submit"
                        type="button"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Login"}
                      </button>
                    </div>
                    <a href="/ForgotPassword">Forgot Password?</a>
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

export default Login;
