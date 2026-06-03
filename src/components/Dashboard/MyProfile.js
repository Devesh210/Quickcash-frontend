import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { apiUrl } from "../../config/api";
const MyProfile = () => {
  const [userdt, setUserdata] = useState([]);
  const [driving, setDrivingdata] = useState([]);
  const [passport, setPassportdata] = useState([]);
  let storagedata = localStorage.getItem("user");
  let saveddata = JSON.parse(storagedata);
  let id = saveddata._id;
  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  useEffect(() => {
    getuserdata();
  }, []);
  const getuserdata = async () => {
    let result = await fetch(apiUrl(`userdata/${id}`));
    result = await result.json();
    const userdt = result[0];
    localStorage.setItem("user", JSON.stringify(result[0]));
    setUserdata(userdt);
  };
  let textInput = React.createRef();
  let textInput1 = React.createRef();
  function handleclick() {
    const fd = new FormData();
    var email = textInput.current.value;
    var fullname = textInput1.current.value;
    if (email == "" ) {
      toast.error("Please Enter Email");
      return false;
    }
    if (fullname == "") {
      toast.error("Please Enter Name");
      return false;
    }
    var drivingfile1 = new Array();
    var drivingfile = driving[0];
    if (drivingfile != undefined) {
      fd.append("drivingfile", drivingfile);
    } else {
      fd.append("drivingfile", drivingfile1);
    }
    var passportfile1 = new Array();
    var passportfile = passport[0];
    if (passportfile != undefined) {
      fd.append("passportfile", passportfile);
    } else {
      fd.append("passportfile", passportfile1);
    }
    fd.append("email", email);
    fd.append("fullname", fullname);
    fd.append("id", id);
    fetch(apiUrl("updateuserprofile"), {
      method: "POST",
      body: fd,
    }).then((response) => {
      if (response.status == 200) {
        swal({
          title: "Wow!",
          text: "Profile Updated Successfully",
          type: "success",
        }).then(function () {
          window.location = "/MyProfile";
        });
      } else {
        swal("Something Went Wrong Please Try Again!", "warning", "warning");
      }
    });
  }
  function ValidateEmail(e) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(textInput.current.value) == false) {
        // alert('Invalid Email Address');
        swal('Invalid Email Address', "", "warning")
        textInput.current.value = userdt.email;
        return false;
    }
    return true;
}
  return (
    <>
      <Header />
      <Container fluid className="userdashboardprofile">
        <Row>
          <div className="col-lg-3">
            <div className="sidebar">
              <Link to="/Userdashboard">User Dashboard</Link>
              <Link className="active" to="/MyProfile">
                My Profile
              </Link>
              <Link to="/ChangePassword">Change Password</Link>
              <Link to="/Viewenquiry">View Enquiry</Link>
              <Link onClick={logoutHandler}>Logout</Link>
            </div>
          </div>
          <div className="content dashhh col-lg-9">
            <h2>My Profile</h2>
            <div className="row my__profile">
              <div className="col-lg-6 mb-4">
                <label className="form-label" htmlFor="inputPassword5">
                  Enter Username
                </label>
                <input
                  placeholder="Enter Username"
                  type="text" disabled
                  className="form-control"
                  defaultValue={userdt.name}
                  ref={textInput1}
                />
              </div>
              <div className="col-lg-6 mb-4">
                <label className="form-label" htmlFor="inputPassword5">
                  Enter Email ID
                </label>
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  className="form-control"
                  defaultValue={userdt.email}
                  ref={textInput} disabled
                  onBlur={ValidateEmail}
                />
              </div>
              <div className="col-lg-6 mb-4">
                <label className="form-label" htmlFor="inputPassword5">
                  Upload Driving License
                </label>
                <input
                  type="file"
                  id="myFile"
                  name="drivinglicense"
                  onChange={(e) => setDrivingdata(e.target.files)}
                  style={{ width: "100%", border: "1px dashed black" }}
                />
              </div>
              <div className="col-lg-6 mb-4">
                <label className="form-label" htmlFor="inputPassword5">
                  Upload Passport
                </label>
                <input
                  type="file"
                  id="myFile"
                  name="passport"
                  onChange={(e) => setPassportdata(e.target.files)}
                  style={{ width: "100%", border: "1px dashed black" }}
                />
              </div>
              <button
                type="button"
                class="btn btn-primary my_fprofle"
                onClick={handleclick}
              >
                Submit
              </button>
            </div>
          </div>
        </Row>
      </Container>
      <Footer />
    </>
  );
};
export default MyProfile;
