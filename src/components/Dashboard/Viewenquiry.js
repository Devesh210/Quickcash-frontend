import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Container, Row, Accordion, FormControl } from "react-bootstrap";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import { Input, RadioGroup } from "rsuite";
import congra from "../../Images/congratulation.jpg";
import ListLoader from "../common/ListLoader";
import moment from "moment";
import axios from "axios";
import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";
import { apiUrl } from "../../config/api";

const Viewenquiry = () => {





  const buttonClick = () => {
    addNotification({
      title: "Warning",
      subtitle: "REMINDER",
      message:
        `Your contract will get expired soon Please Contact to our Quickcash Customer Support`,
      theme: "red",
      // backgroundTop: 'blue',
      // backgroundBottom: 'white',
      // colorTop :'white',
      // colorBottom:'black',
      position: "top-right",
      duration: 3000,
      // native: true // when using native, your OS will handle theming.
    });
  };

  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  let textInput = React.createRef();
  let textInput1 = React.createRef();
  let textInput2 = React.createRef();
  const [offer, setQcoffer] = useState([]);
  const [enid, setMyenid] = useState([]);
  const [type, setMytype] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [aestate, setAestate] = useState("");
  const [verification, setVerification] = useState("");
  const [payment, setPayment] = useState("");
  const [buyback, setBuyback] = useState("");
  const [finaloffer, setFinaloffer] = useState("");
  const [useroffers, setUseroffers] = useState("");
  const [reqdays, setReqDays] = useState(0);
  const [userdetail, setUserdetail] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  console.log(buyback)
  /*Negotiate modal*/
  const handleClose = () => setShow(false);
  /*Negotiate modal*/

  /*offer modal*/
  const handleClose1 = () => setShow1(false);
  /*offer modal*/

  /*Contract modal*/
  const contractmodalclose = () => setShow2(false);
  /*Contract modal*/

  /*Contract modal*/
  const contractnegomodalclose = () => setShow3(false);
  /*Contract modal*/

  /*watch negotiate*/
  const handleShow = async (id) => {
    let result = await fetch(apiUrl(`watchnegotiate/${id}`));
    result = await result.json();
    setQcoffer(result[0]["offer"]);
    setMyenid(result[0]["_id"]);
    setMytype("watch");
    setShow(true);
  };
  /*watch negotiate*/

  /*bag negotiate*/
  const handleShow1 = async (id) => {
    let result = await fetch(apiUrl(`bagnegotiate/${id}`));
    result = await result.json();
    setQcoffer(result[0]["offer"]);
    setMyenid(result[0]["_id"]);
    setMytype("bag");
    setShow(true);
  };
  /*bag negotiate*/

  /*electronic negotiate*/
  const handleShow2 = async (id) => {
    let result = await fetch(apiUrl(`electronicnegotiate/${id}`));
    result = await result.json();
    setQcoffer(result[0]["offer"]);
    setMyenid(result[0]["_id"]);
    setMytype("electronic");
    setShow(true);
  };
  /*electronic negotiate*/

  /*Deny*/
  const handleShow3 = async (id, type) => {
    const fd = new FormData();
    fd.append("type", type);
    fd.append("id", id);
    fd.append("status", 4);
    fetch(apiUrl("updateenstatus"), {
      method: "POST",
      body: fd,
    }).then((response) => {
      if (response.status == 200) {
        swal({
          title: "Wow!",
          text: "Update Successfully",
          type: "success",
        }).then(function () {
          if (type == "watch") {
            watchenofforder();
          }
          if (type == "bag") {
            bagenofforder();
          }
          if (type == "electronic") {
            electronicenofforder();
          }
        });
        swal(
          "",
          "We Regret To See You Going, Please Subscribe To Our Newsletter To Keep In Touch",
          "warning"
        );
        watchenofforder();
        bagenofforder();
        electronicenofforder();
      } else {
        swal("Something Went Wrong Please Try Again!", "warning", "warning");
      }
    });
  };
  /*Deny*/

  /*Watch Accept modal*/
  const handleShow5 = async (id,buyback,offer) => {
    setShow1(true);
    setMyenid(id);
    setMytype("watch");
    setBuyback(buyback);
    setFinaloffer(offer)
  };
  /*Watch Accept modal*/

  /*Bag Accept modal*/
  const handleShow6 = async (id,buyback,offer) => {
    setShow1(true);
    setMyenid(id);
    setMytype("bag");
    setBuyback(buyback);
    setFinaloffer(offer)
  };
  /*Bag Accept modal*/

  /**Electronic Accept modal**/
  const handleShow7 = async (id,buyback,offer) => {
    setShow1(true);
    setMyenid(id);
    setMytype("electronic");
    setBuyback(buyback);
    setFinaloffer(offer)
  };
  /*Electronic Accept modal*/

  /**contract negotiate modal**/
  const handleShow8 = async (id) => {
    setShow3(true);
    setMyenid(id);
    setMytype("watch");
  };
  /*contract negotiate modal*/

  /*contract negotiate modal*/
  const handleShow9 = async (id) => {
    setShow3(true);
    setMyenid(id);
    setMytype("bag");
  };
  /*contract negotiate modal*/

  /*contract negotiate modal*/
  const handleShow10 = async (id) => {
    setShow3(true);
    setMyenid(id);
    setMytype("electronic");
  };
  /*contract negotiate modal*/

  /*contract watch extend modal*/
  const handleShow11 = async (id) => {
    setShow2(true);
    setMyenid(id);
    setMytype("watch");
  };
  /*contract watch extend modal*/

  /*contract bag extend modal*/
  const handleShow12 = async (id) => {
    setShow2(true);
    setMyenid(id);
    setMytype("bag");
  };
  /*contract bag extend modal*/

  /*contract electronic extend modal*/
  const handleShow13 = async (id) => {
    setShow2(true);
    setMyenid(id);
    setMytype("electronic");
  };
  /*contract electronic extend modal*/

  /*submit negotiate offer*/
  const submitoffer = async () => {
    let verifyObj = {
      id: textInput.current.value,
      useroffer: useroffers,
      type: textInput1.current.value,
      negostatus: 1,
    };
    console.log(verifyObj);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(verifyObj),
      redirect: "follow",
    };

    let result = await fetch(apiUrl("userofferupdate"), requestOptions);
    // .then((response) => response.text())
    // .then((result) => console.log(result))
    // .catch((error) => console.log("error", error));

    if (result.status == 200) {
      swal("Thankyou", "Wait for the quickCash Offer", "success");
      watchenofforder();
      bagenofforder();
      electronicenofforder();
      handleClose();
    }
  };
  /*submit negotiate offer*/

  /*submit Extend Days*/
  const extend = async () => {
    let verifyObj = {
      id: textInput.current.value,
      reqdays: reqdays,
      type: textInput1.current.value,
      extendstatus: 1,
    };
    console.log(verifyObj);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(verifyObj),
      redirect: "follow",
    };

    let result = await fetch(apiUrl("extenddays"), requestOptions);
    // .then((response) => response.text())
    // .then((result) => console.log(result))
    // .catch((error) => console.log("error", error));
    if (result.status == 200) {
      swal("Thankyou", "Wait for the quickCash reply", "success");
      watchencontract();
      bagencontract();
      electronicencontract();
      contractmodalclose();
    }
  };
  /*submit Extend Days*/

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

  useEffect(() => {
    document.getElementById("div").style.display = "none";
    document.getElementById("div1").style.display = "none";
    document.getElementById("div2").style.display = "none";
    document.getElementById("div3").style.display = "none";
    document.getElementById("div4").style.display = "none";
    document.getElementById("div5").style.display = "none";
    document.getElementById("div6").style.display = "none";
    document.getElementById("div7").style.display = "none";
    document.getElementById("div8").style.display = "none";
  }, []);

  /**submit verification details**/

  function next() {

    if (aestate == "") 
    {
        swal("Please Select The Centre", "", "warning");
    } 

    else if (verification == "") 
    {
        swal("Please Upload Your contract", "", "warning");
    } 

    else if (payment == "") 
    {
        swal("Please Enter Payment Method", "", "warning");
    } 
    
    else 
    {

    const fd = new FormData();
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user.email;
  
    var verificationfile1 = new Array();
    var verificationfile = verification[0];
    if (verificationfile != undefined) {
      fd.append("verification", verificationfile);
    } else {
      fd.append("verification", verificationfile1);
    }
    fd.append("id", textInput.current.value);
    fd.append("centre", aestate);
    fd.append("payment", payment);
    fd.append("type", textInput1.current.value);
    fd.append("buyback",textInput2.current.value)
    fd.append("finaloffer", finaloffer);
    fd.append("email", email);
    fd.append("acceptstatus",1)
    
    console.log(Array.from(fd))
    fetch(apiUrl("updatedetails"), {
      method: "POST",
      body: fd,
    }).then((response) => {
      if (response.status == 200) {
        swal("Wow!","Updated Successfully","success").then(function () {
          window.location = "/Viewenquiry";
        });
        console.log(response)
      } else {
        swal("Something Went Wrong Please Try Again!", "", "warning");
      }
    });
  }
}

  /**submit verification details**/

  /**dropdown**/

  function showdata(e) {
    const checked = e.target.checked;
    const value = e.target.value;
    if (checked == true) {
      if (value == "watchen") {
        document.getElementById("div").style.display = "block";
        document.getElementById("div1").style.display = "none";
        document.getElementById("div2").style.display = "none";
        document.getElementById("div3").style.display = "none";
        document.getElementById("div4").style.display = "none";
        document.getElementById("div5").style.display = "none";
        document.getElementById("div6").style.display = "none";
        document.getElementById("div7").style.display = "none";
        document.getElementById("div8").style.display = "none";
        document.getElementById("inline-checkbox-1").checked = false;
        document.getElementById("inline-checkbox-2").checked = false;
        document.getElementById("inline-checkbox-3").checked = false;
        document.getElementById("inline-checkbox-4").checked = false;
        document.getElementById("inline-checkbox-5").checked = false;
        document.getElementById("inline-checkbox-6").checked = false;
        document.getElementById("inline-checkbox-7").checked = false;
        document.getElementById("inline-checkbox-8").checked = false;

        watchorder();
      }
      if (value == "bagen") {
        document.getElementById("div1").style.display = "block";
        document.getElementById("div").style.display = "none";
        document.getElementById("div2").style.display = "none";
        document.getElementById("div3").style.display = "none";
        document.getElementById("div4").style.display = "none";
        document.getElementById("div5").style.display = "none";
        document.getElementById("div6").style.display = "none";
        document.getElementById("div7").style.display = "none";
        document.getElementById("div8").style.display = "none";
        document.getElementById("inline-checkbox-0").checked = false;
        document.getElementById("inline-checkbox-2").checked = false;
        document.getElementById("inline-checkbox-3").checked = false;
        document.getElementById("inline-checkbox-4").checked = false;
        document.getElementById("inline-checkbox-5").checked = false;
        document.getElementById("inline-checkbox-6").checked = false;
        document.getElementById("inline-checkbox-7").checked = false;
        document.getElementById("inline-checkbox-8").checked = false;
        bagorder();
      }
      if (value == "electronicen") {
        document.getElementById("div2").style.display = "block";
        document.getElementById("div").style.display = "none";
        document.getElementById("div1").style.display = "none";
        document.getElementById("div3").style.display = "none";
        document.getElementById("div4").style.display = "none";
        document.getElementById("div5").style.display = "none";
        document.getElementById("div6").style.display = "none";
        document.getElementById("div7").style.display = "none";
        document.getElementById("div8").style.display = "none";
        document.getElementById("inline-checkbox-0").checked = false;
        document.getElementById("inline-checkbox-1").checked = false;
        document.getElementById("inline-checkbox-3").checked = false;
        document.getElementById("inline-checkbox-4").checked = false;
        document.getElementById("inline-checkbox-5").checked = false;
        document.getElementById("inline-checkbox-6").checked = false;
        document.getElementById("inline-checkbox-7").checked = false;
        document.getElementById("inline-checkbox-8").checked = false;
        electronicorder();
      }
      if (value == "watchenoff") {
        document.getElementById("div3").style.display = "block";
        document.getElementById("div").style.display = "none";
        document.getElementById("div1").style.display = "none";
        document.getElementById("div2").style.display = "none";
        document.getElementById("div4").style.display = "none";
        document.getElementById("div5").style.display = "none";
        document.getElementById("div6").style.display = "none";
        document.getElementById("div7").style.display = "none";
        document.getElementById("div8").style.display = "none";
        document.getElementById("inline-checkbox-0").checked = false;
        document.getElementById("inline-checkbox-1").checked = false;
        document.getElementById("inline-checkbox-2").checked = false;
        document.getElementById("inline-checkbox-4").checked = false;
        document.getElementById("inline-checkbox-5").checked = false;
        document.getElementById("inline-checkbox-6").checked = false;
        document.getElementById("inline-checkbox-7").checked = false;
        document.getElementById("inline-checkbox-8").checked = false;
        watchenofforder();
      }
      if (value == "bagenoff") {
        document.getElementById("div4").style.display = "block";
        document.getElementById("div").style.display = "none";
        document.getElementById("div1").style.display = "none";
        document.getElementById("div2").style.display = "none";
        document.getElementById("div3").style.display = "none";
        document.getElementById("div5").style.display = "none";
        document.getElementById("div6").style.display = "none";
        document.getElementById("div7").style.display = "none";
        document.getElementById("div8").style.display = "none";
        document.getElementById("inline-checkbox-0").checked = false;
        document.getElementById("inline-checkbox-1").checked = false;
        document.getElementById("inline-checkbox-2").checked = false;
        document.getElementById("inline-checkbox-3").checked = false;
        document.getElementById("inline-checkbox-5").checked = false;
        document.getElementById("inline-checkbox-6").checked = false;
        document.getElementById("inline-checkbox-7").checked = false;
        document.getElementById("inline-checkbox-8").checked = false;
        bagenofforder();
      }
      if (value == "electronicsenoff") {
        document.getElementById("div5").style.display = "block";
        document.getElementById("div").style.display = "none";
        document.getElementById("div1").style.display = "none";
        document.getElementById("div2").style.display = "none";
        document.getElementById("div3").style.display = "none";
        document.getElementById("div4").style.display = "none";
        document.getElementById("div6").style.display = "none";
        document.getElementById("div7").style.display = "none";
        document.getElementById("div8").style.display = "none";
        document.getElementById("inline-checkbox-0").checked = false;
        document.getElementById("inline-checkbox-1").checked = false;
        document.getElementById("inline-checkbox-2").checked = false;
        document.getElementById("inline-checkbox-3").checked = false;
        document.getElementById("inline-checkbox-4").checked = false;
        document.getElementById("inline-checkbox-6").checked = false;
        document.getElementById("inline-checkbox-7").checked = false;
        document.getElementById("inline-checkbox-8").checked = false;
        electronicenofforder();
      }
      if (value == "watchencontract") {
        document.getElementById("div6").style.display = "block";
        document.getElementById("div").style.display = "none";
        document.getElementById("div1").style.display = "none";
        document.getElementById("div2").style.display = "none";
        document.getElementById("div3").style.display = "none";
        document.getElementById("div4").style.display = "none";
        document.getElementById("div5").style.display = "none";
        document.getElementById("div7").style.display = "none";
        document.getElementById("div8").style.display = "none";
        document.getElementById("inline-checkbox-0").checked = false;
        document.getElementById("inline-checkbox-1").checked = false;
        document.getElementById("inline-checkbox-2").checked = false;
        document.getElementById("inline-checkbox-3").checked = false;
        document.getElementById("inline-checkbox-4").checked = false;
        document.getElementById("inline-checkbox-5").checked = false;
        document.getElementById("inline-checkbox-7").checked = false;
        document.getElementById("inline-checkbox-8").checked = false;
        watchencontract();
        // buttonClick();
      }
      if (value == "bagencontract") {
        document.getElementById("div7").style.display = "block";
        document.getElementById("div").style.display = "none";
        document.getElementById("div1").style.display = "none";
        document.getElementById("div2").style.display = "none";
        document.getElementById("div3").style.display = "none";
        document.getElementById("div4").style.display = "none";
        document.getElementById("div5").style.display = "none";
        document.getElementById("div6").style.display = "none";
        document.getElementById("div8").style.display = "none";
        document.getElementById("inline-checkbox-0").checked = false;
        document.getElementById("inline-checkbox-1").checked = false;
        document.getElementById("inline-checkbox-2").checked = false;
        document.getElementById("inline-checkbox-3").checked = false;
        document.getElementById("inline-checkbox-4").checked = false;
        document.getElementById("inline-checkbox-5").checked = false;
        document.getElementById("inline-checkbox-6").checked = false;
        document.getElementById("inline-checkbox-8").checked = false;
        bagencontract();
        // buttonClick();
      }
      if (value == "electronicencontract") {
        document.getElementById("div8").style.display = "block";
        document.getElementById("div").style.display = "none";
        document.getElementById("div1").style.display = "none";
        document.getElementById("div2").style.display = "none";
        document.getElementById("div3").style.display = "none";
        document.getElementById("div4").style.display = "none";
        document.getElementById("div5").style.display = "none";
        document.getElementById("div6").style.display = "none";
        document.getElementById("div7").style.display = "none";
        document.getElementById("inline-checkbox-0").checked = false;
        document.getElementById("inline-checkbox-1").checked = false;
        document.getElementById("inline-checkbox-2").checked = false;
        document.getElementById("inline-checkbox-3").checked = false;
        document.getElementById("inline-checkbox-4").checked = false;
        document.getElementById("inline-checkbox-5").checked = false;
        document.getElementById("inline-checkbox-6").checked = false;
        document.getElementById("inline-checkbox-7").checked = false;
        electronicencontract();
        // buttonClick();
      }
    } else {
      document.getElementById("div").style.display = "none";
      document.getElementById("div1").style.display = "none";
      document.getElementById("div2").style.display = "none";
      document.getElementById("div3").style.display = "none";
      document.getElementById("div4").style.display = "none";
      document.getElementById("div5").style.display = "none";
      document.getElementById("div6").style.display = "none";
      document.getElementById("div7").style.display = "none";
      document.getElementById("div8").style.display = "none";
    }
  }

  /**dropdown**/

  /**Enquiry**/

  const watchorder = async () => {
    setIsLoading(true);
    let result = await fetch(apiUrl(`showorder/${id}`));
    result = await result.json();
    setMyorders(result);
    setIsLoading(false);
  };

  const bagorder = async () => {
    setIsLoading(true);
    let result = await fetch(apiUrl(`showbagorder/${id}`));
    result = await result.json();
    setMybagorders(result);
    setIsLoading(false);
  };

  const electronicorder = async () => {
    setIsLoading(true);
    let result = await fetch(apiUrl(`showelectronicsorder/${id}`));
    result = await result.json();
    setMyelectronicorders(result);
    setIsLoading(false);
  };

  /**Enquiry**/

  /**Offer**/

  const watchenofforder = async () => {
    setIsLoading(true);
    let result = await fetch(apiUrl(`watchofferorder/${id}`));
    result = await result.json();
    setMywatchoffer(result);
    setIsLoading(false);
  };

  const bagenofforder = async () => {
    setIsLoading(true);
    let result = await fetch(apiUrl(`bagofferorder/${id}`));
    result = await result.json();
    setMybagoffer(result);
    setIsLoading(false);
  };

  const electronicenofforder = async () => {
    setIsLoading(true);
    let result = await fetch(apiUrl(`electronicofferorder/${id}`));
    result = await result.json();
    setMyelectronicoffer(result);
    setIsLoading(false);
  };

  /**Offer**/

  /**contract**/

  const watchencontract = async (params) => {
    setIsLoading(true);
    let result = await fetch(apiUrl(`watchcontractorder/${id}`));
    result = await result.json();

    setMywatchcontract(result);
    setIsLoading(false);
    
  };

  const bagencontract = async () => {
    setIsLoading(true);
    let result = await fetch(apiUrl(`bagcontractorder/${id}`));
    result = await result.json();
    setMybagcontract(result);
    setIsLoading(false);
  };

  console.log(mybagcontract);

  const electronicencontract = async () => {
    setIsLoading(true);
    let result = await fetch(apiUrl(`electroniccontractorder/${id}`));
    result = await result.json();
    setMyelectroniccontract(result);
    setIsLoading(false);
  };

  /**contract**/

  /**Watch Enquiry**/

  const columns = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Enquiry Id",
      selector: "_id",
      sortable: true,
      width: "20%",
    },
    {
      name: "Brand",
      selector: (params) => params.brandData[0]["brand"],
      sortable: true,
    },
    {
      name: "Model",
      selector: (params) => params.modelData[0]["model"],
      sortable: true,
    },
    {
      name: "Product",
      selector: (params) => params.producttype,
    },
    {
      name: "Days",
      selector: (params) =>
        params.producttype == "sell" ? "-" : params.days + " Days",
    },
    {
      name: "Product Image",
      selector: (params) => (
        <img
          src={`https://quickcashshop.s3.me-south-1.amazonaws.com/${params.imagefile}`}
          alt="file"
        />
      ),
      width: "12%",
    },
  ];

  /**Watch Enquiry**/

  /**Bag Enquiry**/

  const columns1 = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Enquiry Id",
      selector: "_id",
      sortable: true,
      width: "20%",
    },
    {
      name: "Brand",
      selector: (params) => params.brandData[0]["brand"],
      sortable: true,
    },
    {
      name: "Model",
      selector: "model",
      sortable: true,
    },
    {
      name: "Product",
      selector: (params) => params.producttype,
    },
    {
      name: "Days",
      selector: (params) =>
        params.producttype == "sell" ? "-" : params.days + " Days",
    },
    {
      name: "Product Image",
      selector: (params) => (
        <img
          src={`https://quickcashshop.s3.me-south-1.amazonaws.com/${params.imagefile}`}
          alt="file"
        />
      ),
      width: "12%",
    },
  ];

  /**Bag Enquiry**/

  /**Electronic Enquiry**/

  const columns2 = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Enquiry Id",
      selector: "_id",
      sortable: true,
      width: "20%",
    },
    {
      name: "Brand",
      selector: (params) => params.brandData[0]["brand"],
      sortable: true,
    },
    {
      name: "Model",
      selector: "model",
      sortable: true,
    },
    {
      name: "Product",
      selector: (params) => params.producttype,
    },
    {
      name: "Days",
      selector: (params) =>
        params.producttype == "sell" ? "-" : params.days + " Days",
    },
    {
      name: "Product Image",
      selector: (params) => (
        <img
          src={`https://quickcashshop.s3.me-south-1.amazonaws.com/${params.imagefile}`}
          alt="file"
        />
      ),
      width: "12%",
    },
  ];

  /**Electronic Enquiry**/

  /**Watch offer**/

  const columns3 = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Enquiry Id",
      selector: "_id",
      sortable: true,
      width: "20%",
    },
    {
      name: "Brand",
      selector: (params) => params.brandData[0]["brand"],
      sortable: true,
    },
    {
      name: "Model",
      selector: (params) => params.modelData[0]["model"],
      sortable: true,
    },
    {
      name: "Product",
      selector: (params) => params.producttype,
    },
    {
      name: "Days",
      selector: (params) =>
        params.producttype == "sell" ? "-" : params.days + " Days",
    },
    {
      name: "QC Offer",
      selector: (params) => params.offer + " AED",
      sortable: true,
      width: "10%",
    },
    {
      name: "BuyBack Price",
      selector: (params) => params.buyback === undefined || params.buyback === null || params.buyback === " " ? 0 + " AED" : params.buyback + " AED",
      sortable: true,
      width: "10%",
    },
    {
      name: "Product Image",
      selector: (params) => (
        <img
          src={`https://quickcashshop.s3.me-south-1.amazonaws.com/${params.imagefile}`}
          alt="file"
        />
      ),
      width: "12%",
    },
    {
      name: "Action",
      selector: (params) => [
        <Button variant="success acasd" className={params.acceptstatus == 0 ? "encl" : "dicl"} onClick={() => handleShow5(params._id,params.buyback,params.offer)}>
          Accept
        </Button>,
        <Button
          variant="primary acasd"
          className={params.negostatus == 0 ? "encl" : "dicl"}
          onClick={() => handleShow(params._id)}
        >
          {params.negostatus == 0 ? "Negotiate" : "Wait For The Offer"}
        </Button>,
        <Button
          variant="danger acasd"
          onClick={() => handleShow3(params._id, "watch")}
        >
          Deny
        </Button>,
       
      ],
      width: "28%",
    },
  ];

  /**Watch offer**/

  /**Bag offer**/

  const columns4 = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Enquiry Id",
      selector: "_id",
      sortable: true,
      width: "20%",
    },
    {
      name: "Brand",
      selector: (params) => params.brandData[0]["brand"],
      sortable: true,
    },
    {
      name: "Model",
      selector: "model",
      sortable: true,
    },
    {
      name: "Product",
      selector: (params) => params.producttype,
    },
    {
      name: "Days",
      selector: (params) =>
        params.producttype == "sell" ? "-" : params.days + " Days",
    },
    {
      name: "QC Offer",
      selector: (params) => params.offer + " AED",
      sortable: true,
      width: "10%",
    },
    {
      name: "BuyBack Price",
      selector: (params) => params.buyback === undefined || params.buyback === null || params.buyback === " " ? 0 + " AED" : params.buyback + " AED",
      sortable: true,
      width: "10%",
    },
    {
      name: "Product Image",
      selector: (params) => (
        <img
          src={`https://quickcashshop.s3.me-south-1.amazonaws.com/${params.imagefile}`}
          alt="file"
        />
      ),
      width: "12%",
    },
    {
      name: "Action",
      selector: (params) => [
        <Button variant="success acasd" className={params.acceptstatus == 0 ? "encl" : "dicl"} onClick={() => handleShow6(params._id,params.buyback,params.offer)}>
          Accept
        </Button>,
        <Button
          variant="primary acasd"
          className={params.negostatus == 0 ? "encl" : "dicl"}
          onClick={() => handleShow1(params._id)}
        >
          {params.negostatus == 0 ? "Negotiate" : "Wait For The Offer"}
        </Button>,
        <Button
          variant="danger acasd"
          onClick={() => handleShow3(params._id, "bag")}
        >
          Deny
        </Button>,
      ],
      width: "28%",
    },
  ];

  /**Bag offer**/

  /**Electronic offer**/

  const columns5 = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Enquiry Id",
      selector: "_id",
      sortable: true,
      width: "20%",
    },
    {
      name: "Brand",
      selector: (params) => params.brandData[0]["brand"],
      sortable: true,
    },
    {
      name: "Model",
      selector: "model",
      sortable: true,
    },
    {
      name: "Product",
      selector: (params) => params.producttype,
    },
    {
      name: "Days",
      selector: (params) =>
        params.producttype == "sell" ? "-" : params.days + " Days",
    },
    {
      name: "QC Offer",
      selector: (params) => params.offer + " AED",
      sortable: true,
      width: "10%",
    },
    {
      name: "BuyBack Price",
      selector: (params) => params.buyback === undefined || params.buyback === null || params.buyback === " " ? 0 + " AED" : params.buyback + " AED",
      sortable: true,
      width: "10%",
    },
    {
      name: "Product Image",
      selector: (params) => (
        <img
          src={`https://quickcashshop.s3.me-south-1.amazonaws.com/${params.imagefile}`}
          alt="file"
        />
      ),
      width: "12%",
    },
    {
      name: "Action",
      selector: (params) => [
        <Button variant="success acasd" className={params.acceptstatus == 0 ? "encl" : "dicl"} onClick={() => handleShow7(params._id,params.buyback,params.offer)}>
          Accept
        </Button>,
        <Button
          variant="primary acasd"
          className={params.negostatus == 0 ? "encl" : "dicl"}
          onClick={() => handleShow2(params._id)}
        >
          {params.negostatus == 0 ? "Negotiate" : "Wait For The Offer"}
        </Button>,
        <Button
          variant="danger acasd"
          onClick={() => handleShow3(params._id, "electronic")}
        >
          Deny
        </Button>,
      ],
      width: "28%",
    },
  ];

  /**Electronic offer**/

  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  today = dd + "-" + mm + "-" + yyyy;
  console.log(today);

  /**Watch contract**/

  const columns6 = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Enquiry Id",
      selector: "_id",
      sortable: true,
      width: "20%",
    },
    {
      name: "Brand",
      selector: (params) => params.brandData[0]["brand"],
      sortable: true,
      width: "10%",
    },
    {
      name: "Model",
      selector: (params) => params.modelData[0]["model"],
      sortable: true,
      width: "15%",
    },
    {
      name: "Product",
      selector: (params) => params.producttype,
    },
    {
      name: "Days",
      selector: (params) =>
        params.producttype == "sell" ? "-" : params.days + " Days",
    },
    {
      name: "Remaining Days",
      selector: (params) => days_between(params.contractenddate),
      width: "15%",
    },
    {
      name: "QC Offer",
      selector: (params) => (params.offer != 0 ? params.offer + " AED" : ""),
      sortable: true,
      width: "10%",
    },
    {
      name: "Product-Image",
      selector: (params) => (
        <img
          src={`https://quickcashshop.s3.me-south-1.amazonaws.com/${params.imagefile}`}
          alt="file"
        />
      ),
      width: "15%",
    },
    {
      name: "Action",
      selector: (params) => (
        <Button
          variant="danger acasd"
          onClick={() => handleShow11(params._id)}
          className={
            params.producttype == "buyback" && days_between(params.contractenddate) <= "0 Days"
              ? "encl"
              : "dicl"
          }
        >
          {days_between(params.contractenddate) <= "0 Days" ? "Extend" : days_between(params.contractenddate) }
          {/* {params.producttype == "buyback" && params.contractenddate < today
            ? "Extend"
            : days_between(params.contractenddate)} */}
        </Button>

        // <Button variant="primary acasd"
        // onClick={() => handleShow8(params._id)}
        // >Negotiate</Button>,
      ),
      width: "10%",
    },
  ];

  /**Watch contract**/

  /**Bag contract**/

  const columns7 = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Enquiry Id",
      selector: "_id",
      sortable: true,
      width: "20%",
    },
    {
      name: "Brand",
      selector: (params) => params.brandData[0]["brand"],
      sortable: true,
    },
    {
      name: "Model",
      selector: "model",
      sortable: true,
    },
    {
      name: "Product",
      selector: (params) => params.producttype,
    },
    {
      name: "Days",
      selector: (params) =>
        params.producttype == "sell" ? "-" : params.days + " Days",
    },
    {
      name: "Remaining Days",
      selector: (params) => days_between(params.contractenddate),
      width: "15%",
    },
    {
      name: "QC Offer",
      selector: (params) => params.offer + " AED",
      sortable: true,
      width: "10%",
    },
    {
      name: "Product Image",
      selector: (params) => (
        <img
          src={`https://quickcashshop.s3.me-south-1.amazonaws.com/${params.imagefile}`}
          alt="file"
        />
      ),
      width: "12%",
    },
    {
      name: "Action",
      selector: (params) => (
        <Button
          variant="danger acasd"
          onClick={() => handleShow12(params._id)}
          className={
            params.producttype == "buyback" && days_between(params.contractenddate) <= "0 Days"
              ? "encl"
              : "dicl"
          }
        >
          {days_between(params.contractenddate) <= "0 Days" ? "Extend" : days_between(params.contractenddate) }
          {/* {params.producttype == "buyback" && params.contractenddate <= today
            ? "Extend"
            : days_between(params.contractenddate)} */}
        </Button>

        // <Button variant="primary acasd"
        // onClick={() => handleShow8(params._id)}
        // >Negotiate</Button>,
      ),
      width: "10%",
    },
  ];

  /**Bag contract**/

  /**Electronic contract**/

  const columns8 = [
    {
      name: "Sr No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Enquiry Id",
      selector: "_id",
      sortable: true,
      width: "20%",
    },
    {
      name: "Brand",
      selector: (params) => params.brandData[0]["brand"],
      sortable: true,
    },
    {
      name: "Model",
      selector: "model",
      sortable: true,
    },
    {
      name: "Product",
      selector: (params) => params.producttype,
    },
    {
      name: "Days",
      selector: (params) =>
        params.producttype == "sell" ? "-" : params.days + " Days",
    },
    {
      name: "Remaining Days",
      selector: (params) => days_between(params.contractenddate),
      width: "15%",
    },
    {
      name: "QC Offer",
      selector: (params) => params.offer + " AED",
      sortable: true,
      width: "10%",
    },
    {
      name: "Product Image",
      selector: (params) => (
        <img
          src={`https://quickcashshop.s3.me-south-1.amazonaws.com/${params.imagefile}`}
          alt="file"
        />
      ),
      width: "12%",
    },
    {
      name: "Action",
      selector: (params) => (
        <Button
          variant="danger acasd"
          onClick={() => handleShow13(params._id)}
          className={
            params.producttype == "buyback" && days_between(params.contractenddate) <= "0 days"
              ? "encl"
              : "dicl"
          }
        >
          {days_between(params.contractenddate) <= "0 Days" ? "Extend" : days_between(params.contractenddate) }
          {/* {params.producttype == "buyback" && params.contractenddate <= today
            ? "Extend"
            : days_between(params.contractenddate)} */}
        </Button>

        // <Button variant="primary acasd"
        // onClick={() => handleShow8(params._id)}
        // >Negotiate</Button>,
      ),
      width: "10%",
    },
  ];

  /**Electronic contract**/

  function reformatDateString(s) {
    var b = s.split(/\D/);
    return b.reverse().join("-");
  }

  function days_between(contractenddate) {
    if (contractenddate != undefined || contractenddate != null) 
    {
      const a = new Date(reformatDateString(moment(new Date()).format("DD-MM-YYYY")));
      const b = new Date(reformatDateString(contractenddate));
      var timeDifferenceInDays = dateDiffInDays(a, b)+" Days";
    } 
    else 
    {
      var timeDifferenceInDays = "";
    }

    if (parseInt(timeDifferenceInDays) < 0) {
      var asdf = "0 Days";
    }
    else {
      var asdf = timeDifferenceInDays;
    }
    
    return asdf;
  }

  function dateDiffInDays(a, b) 
  {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  const userverification = async () => {
    let result = await fetch(apiUrl("getuser"));
    result = await result.json();
    setUserdetail(result);
    console.log(userdetail);
  };

  const docsign = async () => {
    console.log("sent");
    const user = JSON.parse(localStorage.getItem("user"));
    const name = user.name;
    const email = user.email;
    const token = JSON.parse(localStorage.getItem("token"));
    swal("Sent Successfully","Link has been sent to your email please sign the document","success")
   

    let result = await fetch(apiUrl("esign"), {
      method: "post",
      body: JSON.stringify({ name, email, token }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
  };

  return (
    <>
      <Header />
      <Container fluid className="userdashboardprofile">
        <Row>
          <div className="col-lg-3">
            <div className="sidebar">
              <Link to="/Userdashboard">User Dashboard</Link>
              <Link to="/MyProfile">My Profile</Link>
              <Link to="/ChangePassword">Change Password</Link>
              <Link className="active" to="/Viewenquiry">
                View Enquiry
              </Link>
              <Link onClick={logoutHandler}>Logout</Link>
            </div>
          </div>
          <div className="content dashhh col-lg-9">
            <h2>View Enquiry</h2>
            <ListLoader isLoading={isLoading} />
            <Accordion defaultActiveKey="0">
              <Notifications />

              <div className="row my__profile">
                <div className="col-lg-4 mb-4">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Enquiries</Accordion.Header>
                    <Accordion.Body>
                      <div className="form_abcds">
                        <div class="form-check form-check-inline">
                          <label
                            title=""
                            for="inline-checkbox-1"
                            class="form-check-label"
                          >
                            Watches
                          </label>
                          <input
                            name="group1"
                            type="checkbox"
                            id="inline-checkbox-0"
                            class="form-check-input"
                            value="watchen"
                            onClick={showdata}
                          />
                        </div>
                      </div>
                      <div className="form_abcds">
                        <div class="form-check form-check-inline">
                          <label
                            title=""
                            for="inline-checkbox-1"
                            class="form-check-label"
                          >
                            Bags
                          </label>
                          <input
                            name="group1"
                            type="checkbox"
                            id="inline-checkbox-1"
                            class="form-check-input"
                            value="bagen"
                            onClick={showdata}
                          />
                        </div>
                      </div>
                      <div className="form_abcds">
                        <div class="form-check form-check-inline">
                          <label
                            title=""
                            for="inline-checkbox-1"
                            class="form-check-label"
                          >
                            Electronics
                          </label>
                          <input
                            name="group1"
                            type="checkbox"
                            id="inline-checkbox-2"
                            class="form-check-input"
                            value="electronicen"
                            onClick={showdata}
                          />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
                <div className="col-lg-4 mb-4">
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Offers</Accordion.Header>
                    <Accordion.Body>
                      <div className="form_abcds">
                        <div class="form-check form-check-inline">
                          <label
                            title=""
                            for="inline-checkbox-1"
                            class="form-check-label"
                          >
                            Watches
                          </label>
                          <input
                            name="group1"
                            type="checkbox"
                            id="inline-checkbox-3"
                            class="form-check-input"
                            value="watchenoff"
                            onClick={showdata}
                          />
                        </div>
                      </div>
                      <div className="form_abcds">
                        <div class="form-check form-check-inline">
                          <label
                            title=""
                            for="inline-checkbox-1"
                            class="form-check-label"
                          >
                            Bags
                          </label>
                          <input
                            name="group1"
                            type="checkbox"
                            id="inline-checkbox-4"
                            class="form-check-input"
                            value="bagenoff"
                            onClick={showdata}
                          />
                        </div>
                      </div>
                      <div className="form_abcds">
                        <div class="form-check form-check-inline">
                          <label
                            title=""
                            for="inline-checkbox-1"
                            class="form-check-label"
                          >
                            Electronics
                          </label>
                          <input
                            name="group1"
                            type="checkbox"
                            id="inline-checkbox-5"
                            class="form-check-input"
                            value="electronicsenoff"
                            onClick={showdata}
                          />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
                <div className="col-lg-4 mb-4">
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Contracts</Accordion.Header>
                    <Accordion.Body>
                      <div className="form_abcds">
                        <div class="form-check form-check-inline">
                          <label
                            title=""
                            for="inline-checkbox-1"
                            class="form-check-label"
                          >
                            Watches
                          </label>
                          <input
                            name="group1"
                            type="checkbox"
                            id="inline-checkbox-6"
                            class="form-check-input"
                            value="watchencontract"
                            onClick={showdata}
                          />
                        </div>
                      </div>
                      <div className="form_abcds">
                        <div class="form-check form-check-inline">
                          <label
                            title=""
                            for="inline-checkbox-1"
                            class="form-check-label"
                          >
                            Bags
                          </label>
                          <input
                            name="group1"
                            type="checkbox"
                            id="inline-checkbox-7"
                            class="form-check-input"
                            value="bagencontract"
                            onClick={showdata}
                          />
                        </div>
                      </div>
                      <div className="form_abcds">
                        <div class="form-check form-check-inline">
                          <label
                            title=""
                            for="inline-checkbox-1"
                            class="form-check-label"
                          >
                            Electronics
                          </label>
                          <input
                            name="group1"
                            type="checkbox"
                            id="inline-checkbox-8"
                            class="form-check-input"
                            value="electronicencontract"
                            onClick={showdata}
                          />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
              </div>
            </Accordion>
          </div>
        </Row>
        <div className="row my__profile" id="div">
          <DataTable
            columns={columns}
            data={myorders}
            highlightOnHover
            pagination
          />
        </div>
        <div className="row my__profile" id="div1">
          <DataTable
            columns={columns1}
            data={mybagorders}
            highlightOnHover
            pagination
          />
        </div>
        <div className="row my__profile" id="div2">
          <DataTable
            columns={columns2}
            data={myelectronicorders}
            highlightOnHover
            pagination
          />
        </div>
        <div className="row my__profile" id="div3">
          <DataTable
            columns={columns3}
            data={mywatchoffer}
            highlightOnHover
            pagination
          />
        </div>
        <div className="row my__profile" id="div4">
          <DataTable
            columns={columns4}
            data={mybagoffer}
            highlightOnHover
            pagination
          />
        </div>
        <div className="row my__profile" id="div5">
          <DataTable
            columns={columns5}
            data={myelectronicoffer}
            highlightOnHover
            pagination
          />
        </div>
        <div className="row my__profile" id="div6">
          <DataTable
            columns={columns6}
            data={mywatchcontract}
            highlightOnHover
            pagination
          />
        </div>
        <div className="row my__profile" id="div7">
          <DataTable
            columns={columns7}
            data={mybagcontract}
            highlightOnHover
            pagination
          />
        </div>
        <div className="row my__profile" id="div8">
          <DataTable
            columns={columns8}
            data={myelectroniccontract}
            highlightOnHover
            pagination
          />
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>QuickCash Offer</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  defaultValue={offer}
                  disabled
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Your Offer</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUseroffers(e.target.value)}
                />
              </Form.Group>
              <input type="hidden" defaultValue={enid} ref={textInput}></input>
              <input type="hidden" defaultValue={type} ref={textInput1}></input>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={submitoffer}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal centered size="lg" show={show1} onHide={handleClose1}>
          {/* <Modal.Header closeButton>
            <Modal.Title>Congratulations!!!</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <img
              style={{
                width: "65%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
              src={congra}
            />
            <h4 className="titleae">
              Now You Can Process <br />
              For The Further Verifications And Uploads
            </h4>
            <ul className="aseas">
              <li id="state">
                <p className="abcd_abcda123">
                  Verification and handover of the Products at our given exp
                  centre (burjuman/Jlt/DSO)
                </p>
                <div onChange={(e) => setAestate(e.target.value)}>
                  <Input type="radio" name="centre" value="Burjuman" />
                  <span className="radioolos">Burjuman</span>
                  <Input type="radio" name="centre" value="Jlt" />
                  <span className="radioolos">Jlt</span>
                  <Input type="radio" name="centre" value="DSO" />
                  <span className="radioolos">DSO</span>
                </div>
              </li>
              <li>
                <p
                  style={{
                    marginBottom: 3,
                    lineHeight: "1.5",
                    marginTop: 10,
                    fontWeight: 600,
                    paddingBottom: 0,
                    fontSize: 23,
                    fontFamily: "poppins, sans-serif",
                  }}
                >
                  Sign Your Contract
                </p>

                <a
                  href="#"
                  style={{
                    lineHeight: "1.5",
                    marginTop: 5,
                    letterSpacing: 1,
                    textAlign: "center",
                    fontWeight: 600,
                    paddingBottom: 10,
                    fontSize: 15,
                    fontFamily: "poppins, sans-serif",
                  }}
                  onClick={()=>{docsign()}}
                >
                  Via Docusign
                </a>
              </li>
              <p
                style={{
                  marginBottom: 3,
                  lineHeight: "1.5",
                  marginTop: 5,
                  fontWeight: 600,
                  paddingBottom: 0,
                  fontSize: 21,
                  fontFamily: "poppins, sans-serif",
                }}
              >
                OR
              </p>

              <li id="verification">
                <p className="abcd_abcda123">Upload your manual contract </p>
                <div className="filess">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setVerification(e.target.files)}
                    accept="image/*,.pdf, .txt,.doc, .docx"
                  />
                </div>
              </li>
              <br />
              <li id="payment">
                <p className="abcd_abcda123">
                  Choose your preferred way of collecting payment
                </p>
                <div onChange={(e) => setPayment(e.target.value)}>
                  <Input type="radio" name="payment" value="Bank" />
                  <span className="radioolos">Bank</span>
                  <Input type="radio" name="payment" value="Cash" />
                  <span className="radioolos">Cash</span>
                </div>
              </li>
            </ul>
            <input type="hidden" defaultValue={enid} ref={textInput}></input>
            <input type="hidden" defaultValue={type} ref={textInput1}></input>
            <input type="hidden" defaultValue={buyback} ref={textInput2}></input>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={next}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show2} onHide={contractmodalclose}>
          {/* <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label htmlFor="inputPassword5">
                  Select No. of Days to Buy Back
                </Form.Label>
                <div class="range-wrap">
                  <input
                    type="range"
                    class="range"
                    value={reqdays}
                    onChange={(e) => setReqDays(e.target.value)}
                  />
                  <output id="rangevalue">{reqdays} Days</output>
                </div>
              </Form.Group>
              <input type="hidden" defaultValue={enid} ref={textInput}></input>
              <input type="hidden" defaultValue={type} ref={textInput1}></input>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={contractmodalclose}>
              Close
            </Button>
            <Button variant="primary" onClick={extend}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show3} onHide={contractnegomodalclose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>QuickCash Offer</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  defaultValue={offer}
                  disabled
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Your Offer</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUseroffers(e.target.value)}
                />
              </Form.Group>
              <input type="hidden" defaultValue={enid} ref={textInput}></input>
              <input type="hidden" defaultValue={type} ref={textInput1}></input>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={contractnegomodalclose}>
              Close
            </Button>
            <Button variant="primary">Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </>
  );
};

export default Viewenquiry;
