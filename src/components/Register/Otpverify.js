import axios from "axios";
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { apiUrl } from "../../config/api";

function Otpverify() {
  const [otpForm, setOtpForm] = useState({
    otp: "",
    userId: "",
  });

  const otpChangeHandler = (e) => {
    setOtpForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const email = localStorage
    .getItem("result")
    .replace(/^["'](.+(?=["']$))["']$/, "$1");

  const otpSubmit = async (e) => {
    let obj = {
      otp: otpForm,
      email: email,
    };

    const res = await axios.post(apiUrl("verifyotp"), obj);
    console.log(res.data);
    console.log(otpForm);
    const UserOtp = res.data[0].otp;
    if (UserOtp == otpForm) {
      window.location = "/Login";
    } else {
      swal("Please Enter Valid Otp", "", "warning");
    }
  };

  const resendotp = async (e) => {
    let obj = {
        email: email
    }
    const res = await axios.post(apiUrl("resendotp"), obj);
    console.log(res.data)
    if (res.status == 200) {
      swal("", `Otp Sent Succesfully to ${email}`, "success");
    } else {
      swal("Something Went Wrong", "", "warning");
    }
  };

  return (
    <div className="thank-you-bg">
      <div
        className="thank-u-container"
        style={{ background: "rgba(37, 172, 243, 0.8)" }}
      >
        {/* style={{ backgroundImage: `url("https://ictkart-pro.s3.us-east-2.amazonaws.com/bg-banner.jpg")`, backgroundRepeat: 'no-repeat' }} */}
        <div className="thank-u-content">
          <h3>Thanking you for signup</h3>
          <p>An OTP has been sent to your entered email <span style={{color:"black"}}>{email}</span></p>
          <input
            type="text"
            className="form-control input-otp"
            value={otpForm.otp}
            name="otp"
            onChange={(e) => setOtpForm(e.target.value)}
            placeholder="Enter your OTP"
            required
          />
          <br />
          <div className="v-otp-c">
            <button
              className="btn btn-primary btn-sm verify-btn"
              onClick={otpSubmit}
            >
              Verify OTP
            </button>
            {/* <a className="resend-otp-thank-u" onClick={resendotp}>Resend OTP</a> */}
          </div>
          <br />
          <p>Didn't recieved otp?</p>
          <div className="v-otp-c">
            <a className="resend-otp-thank-u" onClick={resendotp}>
              Resend OTP
            </a>
          </div>
          {/* <br />
                    <a className="cursor-pointer" onClick={verifyWithOTP}>Verify using OTP</a>
                    <br /> */}
          {/* <span>OR</span>
                    <br />
                    <Link to={`/user/update-profile?step=myprofile`} className="btn btn-primary">Get Started!</Link>
                    <br /> */}
        </div>
      </div>
    </div>
  );
}

export default Otpverify;
