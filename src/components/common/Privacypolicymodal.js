import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Privacypolicymodal = (props) => {
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: '20px', color: '#25aae1', fontWeight: '600', textAlign: 'center' }} id="contained-modal-title-vcenter">
                        Privacy Policy
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="termsandcondition11">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Privacypolicymodal;