import { Container, Row } from "react-bootstrap";
import connect from '../Images/connect.svg'
import check from '../Images/check.svg'
import collect from '../Images/collect.svg'
const Howitworks = () => {
    return (
        <>
            <Container fluid className="how_it_works_acbd">
                <Container>
                    <h1 className="how-it-work">How it works</h1>
                    <Row>
                        <div className="col-lg-7">
                            <Row className="mb-4">
                                <div className="col-lg-2">
                                </div>
                                <div className="col-lg-2">
                                    <img src={connect} />
                                </div>
                                <div className="col-lg-7">
                                    <h1 class="work-h1">Connect</h1>
                                    <p class="parass">Connect with us to sell/trade your unwanted products.</p>
                                </div>
                            </Row>
                            <Row className="mb-4">
                                <div className="col-lg-2">
                                </div>
                                <div className="col-lg-2">
                                    <img src={check} />
                                </div>
                                <div className="col-lg-7">
                                    <h1 class="work-h1">Check</h1>
                                    <p class="parass">The traded product will be checked with the market value on it.</p>
                                </div>
                            </Row>
                            <Row className="mb-4">
                                <div className="col-lg-2">
                                </div>
                                <div className="col-lg-2">
                                    <img src={collect} />
                                </div>
                                <div className="col-lg-7">
                                    <h1 class="work-h1">Collect</h1>
                                    <p class="parass">You can collect cash instantly and directly to your bank account.</p>
                                </div>
                            </Row>
                        </div>
                        <div className="col-lg-5">
                            <iframe class="you-tude" width="100%" height="320" src="https://www.youtube.com/embed/Q_8DuzMSVVs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                        </div>
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default Howitworks;