import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 


const Home = () => {

    return (
        <Container className='mt-5'>
            <Row className='justify-content-center'>
                <Col md={8} lg={6}>
                    <Card>
                        <Card.Header className='text-center'>
                            <h2>Ticket Management System</h2>
                        </Card.Header>
                        <Card.Body className='d-grid gap-3'>
                            <Link to="/submit">
                                <Button variant='primary' size='lg'>
                                    Submit Ticket
                                </Button>
                            </Link>
                            <Link to='/view'>
                                <Button variant='info' size='lg'>
                                    View Ticket
                                </Button>
                            </Link>
                            <Link to='/update'>
                                <Button variant='warning' size='lg'>
                                    Update Ticket
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;