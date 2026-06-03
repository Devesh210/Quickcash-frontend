import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container, Row, InputGroup, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import facebook from "../../Images/facebook.svg";
import instagram from "../../Images/instagram.svg";
import twitter from "../../Images/twitter.svg";
import linkedin from "../../Images/linkedin.svg";
import cards from "../../Images/cards.svg";
import { apiFetch } from "../../config/api";
import { storage } from "../../config/storage";

const Footer = () => {
  const usertextInput = useRef(null);
  const [email, setEmail] = useState("");
  const isLoggedIn = !!storage.getToken();

  const categoryLinks = useMemo(
    () => ({
      watch: isLoggedIn ? "/Watch" : "/Login",
      bag: isLoggedIn ? "/Bag" : "/Login",
      electronics: isLoggedIn ? "/Electronics" : "/Login",
      nft: isLoggedIn ? "#" : "/Login",
    }),
    [isLoggedIn]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateEmail = () => {
    const currentEmail = usertextInput.current?.value || "";

    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(currentEmail)) {
      setEmail(currentEmail);
      return true;
    }

    swal("You have entered an invalid email address!", "", "warning");
    return false;
  };

  const submitHandler = async () => {
    const emailid = usertextInput.current?.value || "";
    if (!emailid) {
      swal("Please Enter Valid Email Address", "", "warning");
      return;
    }

    if (!validateEmail()) {
      return;
    }

    const timestamp = new Date().toLocaleString();
    let result = await apiFetch("validnewsemail", {
      method: "post",
      body: JSON.stringify({ email: emailid }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    if (result.email === emailid) {
      swal("Subscribed Already", "", "warning");
      usertextInput.current.value = "";
      return;
    }

    await apiFetch("addnewsletter", {
      method: "post",
      body: JSON.stringify({ email: emailid, timestamp }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    swal("Subscription confirmed", "", "success");
    usertextInput.current.value = "";
    setEmail("");
  };

  return (
    <>
      <Container fluid className="footer">
        <Container>
          <Row>
            <div className="col-lg-4">
              <h3>CATEGORIES</h3>
              <ul>
                <li>
                  <Link to={categoryLinks.watch}>Luxury Watches</Link>
                </li>
                <li>
                  <Link to={categoryLinks.bag}>Luxury Bags</Link>
                </li>
                <li>
                  <Link to={categoryLinks.electronics}>Electronics</Link>
                </li>
                <li>
                  <Link to={categoryLinks.nft}>NFT</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h3>HELP</h3>
              <ul>
                <li>Track Enquiry</li>
                <li>
                  <Link to="/Termscondition">Terms & Condition</Link>
                </li>
                <li>
                  <Link to="/Privacypolicy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/Faqs">FAQs</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 get_in_touch">
              <h3>GET IN TOUCH</h3>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/profile.php?id=100083511814763"
              >
                <img src={facebook} alt="Facebook" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://instagram.com/quickcashofficial_?igshid=YmMyMTA2M2Y="
              >
                <img src={instagram} alt="Instagram" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/_QuickCash"
              >
                <img src={twitter} alt="Twitter" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/company/quick-cash-22/"
              >
                <img src={linkedin} alt="LinkedIn" />
              </a>
              <InputGroup className="mb-3 mt-4">
                <Form.Control
                  placeholder="Your work email address"
                  aria-label="Your work email address"
                  aria-describedby="basic-addon2"
                  value={email}
                  ref={usertextInput}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={validateEmail}
                />
                <Button
                  onClick={submitHandler}
                  variant="outline-secondary"
                  id="button-addon2"
                >
                  Send
                </Button>
              </InputGroup>
            </div>
          </Row>
          <img
            src={cards}
            style={{
              justifyContent: "center",
              display: "block",
              margin: "auto",
              paddingTop: "20px",
            }}
            alt="Accepted cards"
          />
        </Container>
      </Container>
    </>
  );
};

export default React.memo(Footer);
