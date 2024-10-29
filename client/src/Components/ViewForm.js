import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card, Table } from 'react-bootstrap';
import axios from 'axios';


const ViewForm = () => {
    const apiURL = process.env.REACT_APP_API_URL;
    axios.defaults.withCredentials = true;
    const [ticketId, setTicketId] = useState();
    const [message, setMessage] = useState('');
    const [ticket, setTicket] = useState(null);

    const handleTicketIdChange = (e) => {
        setTicketId(e.target.value);
    };

    const handleFetchTicket = async(e) => {
        e.preventDefault();
        setMessage('');
        setTicket(null);

        try{
            const response = await axios.get(`${apiURL}/${ticketId}`);
            // console.log(`${apiURL}/${ticketId}`);
            setTicket(response.data);
            console.log(response);
            setMessage('Ticket Status Fetched!')
        }catch(error) {
            setMessage(error.response?.data?.message);
        }
    };


    return (
        <Container className='mt-5'>
            <Row className='justify-content-center'>
                <Col md={8} lg={6}>
                    <Card>
                        <Card.Header className='text-center'>
                            <h3>Ticket Status</h3>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleFetchTicket} autoComplete='off'>
                                <Form.Group controlId='TicketID' className='mb-3'>
                                    <Form.Label>Ticket ID</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Ticket ID'
                                        value={ticketId}
                                        onChange={handleTicketIdChange}
                                        required
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <div className='d-grid gap-2'>
                                    <Button variant='primary' type='submit'>
                                        Get Status
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                        {message && <Alert variant='info' className='mt-3'>{message}</Alert>}
                    </Card>
                </Col>
            </Row>

            {ticket && <Table striped bordered hover responsive className='mt-4'>
                <tbody>
                    <tr>
                        <th>Ticket ID</th>
                        <td>{ticket.TicketID}</td>
                    </tr>
                    <tr>
                        <th>Customer Name</th>
                        <td>{ticket.CustomerName}</td>
                    </tr>
                    <tr>
                        <th>Issue Description</th>
                        <td>{ticket.IssueDescription}</td>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <td style={{color:ticket.Status === 'Open' ? 'green' : 'red'}}
                        >{ticket.Status}</td>
                    </tr>
                    <tr>
                        <th>Date Created</th>
                        <td>{new Date(ticket.CreatedDate).toLocaleString()}</td>
                    </tr>
                </tbody>
            </Table>}

        </Container>
    );

};

export default ViewForm;