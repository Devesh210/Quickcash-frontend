import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Footer from "../common/Footer";
import Header from "../common/Header";
import ccmenu from "../../Images/ccmenu.jpg"
import { toast } from "react-toastify";
import swal from "sweetalert";
import Modal from 'react-bootstrap/Modal';
import Privacypolicymodal from "../common/Privacypolicymodal";
import Termsconditionmodal from "../common/Termsconditionmodal";
import Loader from "../common/Loader";
import { apiUrl } from "../../config/api";

let emailInput = React.createRef();

const Watch = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow1, setModalShow1] = React.useState(false);
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [brand, setBrand] = useState("")
    const [addbrands, setAddBrands] = useState([]);
    const [model, setModel] = useState("")
    const [listmodels, setListModels] = useState([]);
    const [rmodelno, setRmodelno] = useState("")
    const [year, setYear] = useState("")
    const [size, setSize] = useState("")
    const [days, setDays] = useState("")
    const [producttype, setProductType] = useState("sell")
    const [box, setBox] = useState("false")
    const [bill, setBill] = useState("false")
    const [paper, setPaper] = useState("false")
    const [desc, setDesc] = useState("")
    const [billfile, setBillfile] = useState("")
    const [imagefile, setImagefile] = useState("")
    const [policy, setPolicy] = useState()
    const [name, setName] = useState("")
    const [email1, setEmail1] = useState("")
    const [contact, setContact] = useState("")
    const [time, setTime] = useState("")
    const [message, setMessage] = useState("")
  let [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setDays(0);
        getbrands();
    }, []);

    const getbrands = async () => {
        let result = await fetch(apiUrl("getbrand"));
        result = await result.json();
        setAddBrands(result);
    };
    const handleButtonClick = async (e) => {
        const ParamValue = e.target.value;
        let result = await fetch(apiUrl("getmodel"), {
            method: "post",
            body: JSON.stringify({ ParamValue }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        result = await result.json();
        setListModels(result);
    };

    function ValidateEmail(e) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(emailInput.current.value) == false) {
            // alert('Invalid Email Address');
            swal('Invalid Email Address', "", "warning")
            emailInput.current.value = '';
            setEmail1(email1 = "")
            return false;
        }
        setEmail1(e.target.value)
        return true;
    }

    const collectData = async () => {
        const UserId = JSON.parse(localStorage.getItem('user'))._id
        const timestamp = Date().toLocaleString()
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (billfile === undefined) {
            billfile = "";
        }

        if (imagefile === undefined) {
            imagefile = "";
        }

        if (brand == "") {
            swal("Please Select Brand", "", "warning");
        }
        else if (model == "") {
            swal("Please Select Model", "", "warning");
        }
        
        else if (name == "") {
            swal("Please Enter Your Name", "", "warning");
        }
        else if (email1 == "") {
            swal("Please Enter Valid Email ID", "", "warning");
        }
        else if (contact == "") {
            swal("Please Enter Your Contact No.", "", "warning");
        }
        else if (time == "") {
            swal("Please Select preferred Time", "", "warning");
        }
        else if (message == "") {
            swal("Please Enter Message", "", "warning");
        }
        else if (policy == "" || policy == undefined) {
            swal("Please Accept Privacy Policy", "", "warning");
        }
        else {
            setIsLoading(true);
            const fd = new FormData()
            fd.append('brand', brand)
            fd.append('model', model)
            fd.append('rmodelno', rmodelno)
            fd.append('year', year)
            fd.append('size', size)
            fd.append('days', days)
            fd.append('producttype', producttype)
            fd.append('box', box)
            fd.append('bill', bill)
            fd.append('paper', paper)
            fd.append('desc', desc)
            var billfile1 = new Array();

            var file = billfile.length;
            console.log(file)
            if (file > 0) {
                for (var i = 0; i < file; i++) {
                    fd.append('billfile', billfile[i]);
                }
            }
            else {
                fd.append('billfile', billfile1);
            }

            var imagefile1 = new Array();

            var imgfile = imagefile.length;
            console.log(imgfile)
            if (imgfile > 0) {
                for (var i = 0; i < imgfile; i++) {
                    fd.append('imagefile', imagefile[i]);
                }
            }
            else {
                fd.append('imagefile', imagefile1);
            }
            fd.append('billfile', billfile);
            fd.append('imagefile', imagefile);
            fd.append('policy', policy)
            fd.append('name', name)
            fd.append('email', email1)
            fd.append('contact', contact)
            fd.append('time', time)
            fd.append('message', message)
            fd.append('userid', UserId)
            fd.append('timestamp', timestamp)

            
            let result = await fetch(apiUrl("watchadd"),
            {
                method: "post",
                body: fd,
            });
            result = await result.json();
            console.log(result)
            if (result._id != "") {
                sessionStorage.setItem("watchenquiryid", result._id)
                swal("Data Submitted Successfully", "success", "success")
                window.location.href = "/Thankyou"
                setIsLoading(false);

            }
        }
    }

    function show1() {
        setDays(0);
        document.getElementById("div1").style.display = "none";
    }
    function show2() {
        setDays(1)
        document.getElementById("div1").style.display = "block";
    }



    return (
        <>
            <Header />
            <Container>
  
                <Form className="watch_datas">
                    <h3 class="our_services_watch">Luxury Watch</h3>
            <Loader isLoading={isLoading} />
                    <Row className="mb-5 mt-4">
                        <h3 class="our_services_watch_desc">Product Details</h3>
                        <div className="col-lg-4">
                            <Form.Label htmlFor="inputPassword5">Would you Like To</Form.Label>
                            <div class="mb-0" onChange={(e)=>setProductType(e.target.value)}>
                                <div class="form-check form-check-inline">
                                    <input name="group1" defaultChecked onClick={show1} type="radio" id="inline-radio-1" class="form-check-input" value="sell"/>
                                    <label title="" for="inline-radio-1" class="form-check-label">Sell</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input name="group1" onClick={show2} type="radio" id="inline-radio-2" class="form-check-input" value="buyback"/>
                                    <label title="" for="inline-radio-2" class="form-check-label">Buy Back</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <Form.Label htmlFor="inputPassword5">Select Brand</Form.Label>
                            <Form.Select aria-label="Default select example"
                                value={brand}
                                onChange={(e) => {
                                    handleButtonClick(e);
                                    setBrand(e.target.value);
                                }}
                            >
                                <option>Select Brand</option>
                                {addbrands.map((item) => (
                                    <option value={item._id}>{item.brand}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className="col-lg-4">
                            <Form.Label htmlFor="inputPassword5">Select Model</Form.Label>
                            <Form.Select aria-label="Default select example"
                                value={model}
                                onChange={(e) =>
                                    setModel(e.target.value)
                                }
                            >
                                <option>Select Model</option>
                                {listmodels.map((item) => (
                                    <option value={item._id}>{item.model}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className="col-lg-4">
                            <Form.Label htmlFor="inputPassword5">Reference Model no</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Reference Model no"
                                value={rmodelno}
                                onChange={(e) =>
                                    setRmodelno(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-lg-4">
                            <Form.Label htmlFor="inputPassword5">Product Purchased Year</Form.Label>
                            <Form.Select aria-label="Default select example"
                                value={year}
                                onChange={(e) =>
                                    setYear(e.target.value)
                                }
                            >
                                <option >Select Year</option>
                                <option value="1990">1990</option>
                                <option value="1991">1991</option>
                                <option value="1992">1992</option>
                                <option value="1993">1993</option>
                                <option value="1994">1994</option>
                                <option value="1995">1995</option>
                                <option value="1996">1996</option>
                                <option value="1997">1997</option>
                                <option value="1998">1998</option>
                                <option value="1999">1999</option>
                                <option value="2000">2000</option>
                                <option value="2001">2001</option>
                                <option value="2002">2002</option>
                                <option value="2003">2003</option>
                                <option value="2004">2004</option>
                                <option value="2005">2005</option>
                                <option value="2006">2006</option>
                                <option value="2007">2007</option>
                                <option value="2008">2008</option>
                                <option value="2009">2009</option>
                                <option value="2010">2010</option>
                                <option value="2011">2011</option>
                                <option value="2012">2012</option>
                                <option value="2013">2013</option>
                                <option value="2014">2014</option>
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                            </Form.Select>
                        </div>
                        <div className="col-lg-4">
                            <Form.Label htmlFor="inputPassword5">Enter Size</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Size"
                                value={size}
                                onChange={(e) =>
                                    setSize(e.target.value)
                                }
                            />
                        </div>

                        <div className="col-lg-12 mb-4" id="div1">
                            <Form.Label htmlFor="inputPassword5">Select No. of Days to Buy Back</Form.Label>
                            <div class="range-wrap">
                                <input type="range" class="range"
                                    value={days}
                                    onChange={(e) =>
                                        setDays(e.target.value)
                                    }
                                />
                                <output id="rangevalue">{days} Days</output>
                            </div>

                        </div>
                        <div className="col-lg-4">
                            <Form.Label htmlFor="inputPassword5">Select Accessories</Form.Label>
                            <div class="mb-3">
                                <div class="form-check form-check-inline">
                                    <input name="group1" type="checkbox" id="inline-checkbox-1" class="form-check-input"
                                        value={box}
                                        onChange={(e) =>
                                            setBox(e.target.checked)
                                        }
                                    />
                                    <label title="" for="inline-checkbox-1" class="form-check-label">Box</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input name="group1" type="checkbox" id="inline-checkbox-2" class="form-check-input"
                                        value={bill}
                                        onChange={(e) =>
                                            setBill(e.target.checked)
                                        }
                                    />
                                    <label title="" for="inline-checkbox-2" class="form-check-label">Bill</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input name="group1" type="checkbox" id="inline-checkbox-3" class="form-check-input"
                                        value={paper}
                                        onChange={(e) =>
                                            setPaper(e.target.checked)
                                        }
                                    />
                                    <label title="" for="inline-checkbox-3" class="form-check-label">Paper/Warrenty Card</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 mb-4">
                            <Form.Label htmlFor="inputPassword5">Add Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Add Description Here"
                                value={desc}
                                onChange={(e) =>
                                    setDesc(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-lg-6">
                            <Form.Label htmlFor="inputPassword5">Upload Bills</Form.Label>
                            <div className="filess">
                                <input className="form-control" type="file" id="myFile" name="billfile" multiple=""
                                    onChange={(e) =>
                                        setBillfile(e.target.files)
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <Form.Label htmlFor="inputPassword5">Upload Product Image</Form.Label>
                            <div className="filess">
                                <input className="form-control" type="file" id="myFile" name="billfile" multiple=""
                                    onChange={(e) =>
                                        setImagefile(e.target.files)
                                    }
                                />
                            </div>
                        </div>
                    </Row>
                    <Row className="mt-4">
                        <h3 class="our_services_watch_desc">Personal Details</h3>
                        <div className="col-lg-4">
                            <Form.Label htmlFor="inputPassword5">Enter Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Username"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-lg-4">
                            <Form.Label htmlFor="inputPassword5">Enter Email ID</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email ID"
                                defaultvalue={email1}
                                ref={emailInput}
                                onBlur={ValidateEmail}
                            />
                        </div>
                        <div className="col-lg-4">
                            <Form.Label htmlFor="inputPassword5">Enter Contact No</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Contact No"
                                value={contact}
                                onChange={(e) =>
                                    setContact(e.target.value)
                                }
                            />
                        </div>
                        <div className="col-lg-4">
                            <Form.Label htmlFor="inputPassword5"

                            >Select Preferred Contact Time</Form.Label>
                            <Form.Select aria-label="Default select example"
                                value={time}
                                onChange={(e) =>
                                    setTime(e.target.value)
                                }
                            >
                                <option>Select Preferred Contact Time</option>
                                <option value="10-11 AM">10-11 AM</option>
                                <option value="12-01 AM">12-01 AM</option>
                            </Form.Select>
                        </div>
                        <div className="col-lg-4">
                            <Form.Label htmlFor="inputPassword5">Write Message</Form.Label>
                            <Form.Control as="textarea" placeholder="Write Your Message Here"
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }
                            />
                        </div>
                    </Row>
                    <div class="mb-3 checkboxform">
                        <div class="form-check form-check-inline">
                            <input name="group1" type="checkbox" id="inline-checkbox-1" class="form-check-input"
                                value={policy}
                                onChange={(e) =>
                                    setPolicy(e.target.checked)
                                }
                            />
                            <label title="" for="inline-checkbox-1" class="form-check-label"><span>CLICK HERE TO AGREE TO OUR <b onClick={() => setModalShow(true)} style={{ color: '#00aadb',cursor:'pointer' }}>PRIVACY POLICY</b> & <b onClick={() => setModalShow1(true)} style={{ color: '#00aadb',cursor:'pointer' }}>TERMS & CONDITIONS</b> AND RECEIVE OUR NOTIFICATIONS</span></label>
                            <Privacypolicymodal show={modalShow} onHide={() => setModalShow(false)} />
                            <Termsconditionmodal show={modalShow1} onHide={() => setModalShow1(false)} />
                        </div>
                    </div>
                    <Button className="btn btn-primary" onClick={collectData}>Submit</Button>
                </Form>
            </Container>
            <Modal centered
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title style={{ fontWeight: '600', color: 'red' }}>Disclaimer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ fontWeight: '600', marginBottom: '5px', color: '#25AAE1', fontSize: '17px' }}>The information you enter is solely for the purpose of verification in order to authentically
                        take you by, through the process. Confidentiality of the information you feed in the
                        earmarked field is warranted. Sell and Receive with ease and security.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <img src={ccmenu} style={{ width: '100%' }} />
            <Footer />
        </>
    );
}

export default Watch;
