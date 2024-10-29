import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card, Modal } from 'react-bootstrap';
import axios from 'axios';

const TicketUpdateForm = () => {
  const apiURL = process.env.REACT_APP_API_URL;
  const [ticketID, setTicketID] = useState('');
  const [status, setStatus] = useState('Open');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);  // Modal visibility state

  const handleTicketIDChange = (e) => {
    setTicketID(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // Fetch current ticket status
  const fetchTicketStatus = async () => {
    try {
      const response = await axios.get(`${apiURL}/${ticketID}`);
      if (response.data.status === 'Closed' && status === 'Open') {
        setMessage('This ticket is already closed. Please create a new ticket.');
        return false;
      }
      return true;
    } catch (error) {
      setMessage('Ticket not found or error fetching ticket status.');
      return false;
    }
  };

  // Show modal before updating status
  const handleShowModal = async (e) => {
    e.preventDefault();
    const canUpdate = await fetchTicketStatus();
    if (canUpdate) setShowModal(true);
  };

  // Confirm and update ticket status
  const handleConfirmUpdate = async () => {
    try {
      await axios.put(`${apiURL}/${ticketID}`, { status });
      setMessage('Ticket status updated successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message);
    } finally {
      setShowModal(false);  // Hide modal after update attempt
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header className="text-center">
              <h3>Update Ticket Status</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleShowModal} autoComplete='off'>
                
                {/* TicketID Field */}
                <Form.Group controlId="TicketID" className="mb-3">
                  <Form.Label>Ticket ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Ticket ID"
                    value={ticketID}
                    onChange={handleTicketIDChange}
                    required
                  />
                </Form.Group>

                {/* Status Field */}
                <Form.Group controlId="Status" className="mb-4">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={status}
                    onChange={handleStatusChange}
                    autoComplete='off'
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Update Status
                  </Button>
                </div>
              </Form>

              {/* Message */}
              {message && <Alert variant="info" className="mt-3">{message}</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Status Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to update the status of this ticket to "{status}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmUpdate}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TicketUpdateForm;
