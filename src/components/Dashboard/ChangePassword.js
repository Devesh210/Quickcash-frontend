import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { apiUrl } from "../../config/api";
const ChangePassword = () => {
    const [newpassword, setNewPassword] = useState("");
    const [newconfirmpassword, setNewConfirmPassword] = useState("");
  let storagedata = localStorage.getItem("user");
  let saveddata = JSON.parse(storagedata);
  let id = saveddata._id;

  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = "/";
  };


  function handleclick() {
    if (newpassword === newconfirmpassword) 
    {
        
        const fd = new FormData();
        fd.append("password",newpassword)
        fd.append("confirmpassword",newconfirmpassword)
        fd.append("id", id);
        fetch(apiUrl("updatepassword"), {
            method: "POST",
            body: fd,
        }).then((response) => {
            if (response.status == 200) {
                swal({
                    title: "Wow!",
                    text: "Profile Updated Successfully",
                    type: "success",
                }).then(function () {
                    window.location = "/ChangePassword";
                });
            } else {
                swal("Something Went Wrong Please Try Again!", "warning", "warning");
            }
        });
    }
}
    
  return (
    <>
      <Header />
      <Container fluid className="userdashboardprofile">
        <Row>
          <div className="col-lg-3">
            <div className="sidebar">
              <Link to="/Userdashboard">User Dashboard</Link>
              <Link  to="/MyProfile">
                My Profile
              </Link>
              <Link to="/ChangePassword" className="active">Change Password</Link>
              <Link to="/Viewenquiry">View Enquiry</Link>
              <Link onClick={logoutHandler}>Logout</Link>
            </div>
          </div>
          <div className="content dashhh col-lg-9">
            <h2>Change Password</h2>
            <div className="row my__profile">
              <div className="col-lg-6 mb-4">
                <label className="form-label" htmlFor="inputPassword5">
                  Enter New Password
                </label>
                <input
                  placeholder="Enter New password"
                  type="text"
                  className="form-control"
                value={newpassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                />
              </div>
              <div className="col-lg-6 mb-4">
                <label className="form-label" htmlFor="inputPassword5">
                  Confirm New Password
                </label>
                <input
                  placeholder="Confirm New Password"
                  type="text"
                  className="form-control"
                  value={newconfirmpassword}
                  onChange={(e)=>setNewConfirmPassword(e.target.value)}
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

export default ChangePassword;
