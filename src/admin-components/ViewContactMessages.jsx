import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Row, Col, Table, Button, Modal } from 'react-bootstrap';
import "../styles/ViewContactMessages.css";
import { contactMessage } from "../services/admin-service.js";

function ViewContactMessages() {
    const [contactMessages, setContactMessages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        contactMessage()
            .then(data => {
                setContactMessages(data);
            })
            .catch(error => {
                console.error("Error fetching messages:", error);
            });
    }, []);

    const handleView = (message) => {
        setSelectedMessage(message);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedMessage(null);
    };

    return (
        <div className="p-0 bg-light">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    {/* <Header /> */}
                    <div className="container-fluid mt-4">
                        <Row>
                            <Col md={12}>
                                <div className="p-1">
                                <div className="card p-2">
                                        <div className="d-flex justify-content-between align-items-center mb-5">
                                        <h3 className="fw-bold">Contact Messages</h3>
                                    </div>
                                        <Table striped bordered hover responsive>
                                            <thead className="thead-dark bg-dark text-white">
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Subject</th>
                                                    <th>Received At</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {contactMessages.length > 0 ? (
                                                    contactMessages.map((item, index) => (
                                                        <tr key={item.contactId}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.contactEmail}</td>
                                                            <td>{item.contactMessage}</td>
                                                            <td>{item.createdAt}</td>
                                                            <td>
                                                                <Button
                                                                    variant="info"
                                                                    size="sm"
                                                                    onClick={() => handleView(item)}
                                                                >
                                                                    View
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="text-center">
                                                            No contact messages available.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Modal for Viewing Details */}
                    <Modal show={showModal} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Contact Message Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedMessage && (
                                <>
                                    <p><strong>Name:</strong> {selectedMessage.name}</p>
                                    <p><strong>Email:</strong> {selectedMessage.contactEmail}</p>
                                    <p><strong>Mobile:</strong> {selectedMessage.contactMobile}</p>
                                    <p><strong>Subject:</strong> {selectedMessage.contactSubject}</p>
                                    <p><strong>Message:</strong> {selectedMessage.contactMessage}</p>
                                    <p><strong>Received At:</strong> {selectedMessage.createdAt}</p>
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default ViewContactMessages;
