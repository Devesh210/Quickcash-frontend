import Footer from "./Footer";
import Header from "./Header";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Accordion, Container } from "react-bootstrap";
const Faqs = () => {
    return (
        <>
            <Header />
            <h2 class="our_services12">Frequently/Non Frequently Ask Questions</h2>
            <span class="our_services1 mb-4">Some of our Frequently/Non Frequently asked questions</span>
            <Container className="tabs_abcd_" style={{marginBottom:'40px'}}>
                <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Frequently Asked Questions">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>How does QuickCash work?</Accordion.Header>
                                <Accordion.Body>
                                    QuickCash is the quickest way to borrow money without a credit check. Typically QuickCash has a term duration of 30 days/one month, plus a 30-day/one-month grace period, subject to particular state legislation.
                                </Accordion.Body>
                            </Accordion.Item>
                            <br />
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>What is the CCC process? How does it work exactly?</Accordion.Header>
                                <Accordion.Body>
                                    Connect Check & Collect Connect with us on QuickCash, Check whether your goods qualify for sale, and Collect your cash once your product is approved.
                                </Accordion.Body>
                            </Accordion.Item>
                            <br />
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>How do I know if my data will be 100% secure?</Accordion.Header>
                                <Accordion.Body>
                                    While your item is in Quick Cash, you still own it. It is our responsibility to keep it safe. When you provide us with data, we take every precaution to protect it.
                                </Accordion.Body>
                            </Accordion.Item>
                            <br />
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>How do I know if I am getting the price according to the market value?</Accordion.Header>
                                <Accordion.Body>
                                    QuickCash renders the perfect value of the item. After researching the item’s current market value and checking up on the product’s condition we fix the appropriate price for your product. The better the condition of your item, the more money we can provide you with.
                                </Accordion.Body>
                            </Accordion.Item>
                            <br />
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Can I collect the item back?</Accordion.Header>
                                <Accordion.Body>
                                    Yes, you can collect your item back anytime, all you have to do is repay the amount of product collected while selling.
                                </Accordion.Body>
                            </Accordion.Item>
                            <br />
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>Can I sell more than one device? Do I have to create separate price requests for each of the products?</Accordion.Header>
                                <Accordion.Body>
                                    A big yes, you can sell more than one device there are no limitations on how many products you can sell and you can buy them back whenever with ease from the comfort of your home.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Tab>
                    <Tab eventKey="profile" title="Non Frequently Asked Questions">
                    <Accordion defaultActiveKey="6">
                            <Accordion.Item eventKey="6">
                                <Accordion.Header>What’s the difference between Loan and QuickCash? Aren’t they both the same?</Accordion.Header>
                                <Accordion.Body>
                                A loan is borrowed from banks whereas QuickCash is an innovative way to get money just by renting your product. Loans do not assure much flexibility, you have to pay interest on your principal amount. On the other side, Quick Cash assures complete flexibility and provides instant cash amidst your needs.
                                </Accordion.Body>
                            </Accordion.Item>
                            <br />
                            <Accordion.Item eventKey="7">
                                <Accordion.Header>Where do the products go after we sell/trade them?</Accordion.Header>
                                <Accordion.Body>
                                Our products are quickly shipped and handled with care. All items that you sell/trade go to ensure warehouse to ensure their safety, we ensure to render the best experience possible.
                                </Accordion.Body>
                            </Accordion.Item>
                            <br />
                            <Accordion.Item eventKey="8">
                                <Accordion.Header>Do we get the best deals while buying the products back?</Accordion.Header>
                                <Accordion.Body>
                                We are dedicated to offering you the best deals on products and services. We help by providing free estimates and access to our network of vendors.
                                </Accordion.Body>
                            </Accordion.Item>
                            <br />
                            <Accordion.Item eventKey="9">
                                <Accordion.Header>Why should I trade when I can get a loan without selling/trading my valuable products?</Accordion.Header>
                                <Accordion.Body>
                                Accessing money in return for your money is more accurate and feels less of a burden at a certain point compared to a loan where the only thing you return is money with interest. The QuickCash deal works well for you because it gives you access to funds to start your business early on and provides the ability to gain sales.
                                </Accordion.Body>
                            </Accordion.Item>
                            <br />
                            <Accordion.Item eventKey="10">
                                <Accordion.Header>Why should I sell my products on the QuickCash platform, when I can go to the store and sell it there for more?</Accordion.Header>
                                <Accordion.Body>
                                Selling on the QuickCash platform is a lot more convenient than selling at the store. We just have 3 steps that you need to follow i.e Connect - Check - Collect. You don’t have to visit any store to sell products, you can just visit our website and sell them from the comfort of your home.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Tab>
                </Tabs>
            </Container>
            <Footer />
        </>
    );
}

export default Faqs;