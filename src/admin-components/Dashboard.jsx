import React from "react";
import { Button, Card, Row, Col } from 'react-bootstrap';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/admin.css";

function Dashboard() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0 bg-dark" style={{ height: "100vh" }}>
                    <Sidebar />
                </div>
                {/* Content */}
                <div className="col-md-10 bg-light">
                    <Header />
                    {/* Dashboard Content */}
                    <div className="p-3">
                        <h5 className="text-primary">Welcome to the Admin Dashboard</h5>
                        <p>Manage your application using the tools below.</p>
                        {/* Example Content Cards */}
                        <Row>
                            <Col md={4}>
                                <Card className="mb-4 shadow-sm border-0 rounded">
                                    <Card.Body>
                                        <Card.Title className="text-success">Manage Users</Card.Title>
                                        <Card.Text>
                                            View and manage all registered users.
                                        </Card.Text>
                                        <Button variant="outline-success">Go to Users</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="mb-4 shadow-sm border-0 rounded">
                                    <Card.Body>
                                        <Card.Title className="text-info">Manage Projects</Card.Title>
                                        <Card.Text>
                                            Keep track of all ongoing projects.
                                        </Card.Text>
                                        <Button variant="outline-info">Go to Projects</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="mb-4 shadow-sm border-0 rounded">
                                    <Card.Body>
                                        <Card.Title className="text-warning">Reports</Card.Title>
                                        <Card.Text>
                                            Generate reports to analyze performance.
                                        </Card.Text>
                                        <Button variant="outline-warning">View Reports</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
