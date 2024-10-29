import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

const TicketForm = () => {
  const apiURL = process.env.REACT_APP_API_URL;
  axios.defaults.withCredentials = true;
  const [formData, setFormData] = useState({
    TicketID: '',
    CustomerName: '',
    IssueDescription: '',
    Status: 'Open'
  });
  const [submitSuccess, setSubmitSuccess] = useState(null); // To handle success or error messages

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiURL, formData);  // Replace '/api/tickets' with your actual API endpoint
      setSubmitSuccess(true);
      console.log('Form Submitted', response.data);
    } catch (error) {
      setSubmitSuccess(false);
      console.error('Error submitting form', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header className="text-center">
              <h3>Create a Support Ticket</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit} autoComplete='off'>
                
                {/* TicketID Field */}
                <Form.Group controlId="TicketID" className="mb-3">
                  <Form.Label>Ticket ID</Form.Label>
                  <Form.Control
                    type="number"
                    name="TicketID"
                    placeholder="Enter Ticket ID"
                    value={formData.TicketID}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* CustomerName Field */}
                <Form.Group controlId="CustomerName" className="mb-3">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="CustomerName"
                    placeholder="Enter Customer Name"
                    value={formData.CustomerName}
                    onChange={handleChange}
                    autoComplete='off'
                    required
                  />
                </Form.Group>

                {/* IssueDescription Field */}
                <Form.Group controlId="IssueDescription" className="mb-3">
                  <Form.Label>Issue Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="IssueDescription"
                    placeholder="Describe the issue"
                    value={formData.IssueDescription}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Status Field */}
                {/* <Form.Group controlId="Status" className="mb-4">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="Status"
                    value={formData.Status}
                    onChange={handleChange}
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </Form.Select>
                </Form.Group> */}

                {/* Submit Button */}
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Submit Ticket
                  </Button>
                </div>
              </Form>

              {/* Success/Failure Message */}
              {submitSuccess === true && <Alert variant="success" className="mt-3">Ticket submitted successfully!</Alert>}
              {submitSuccess === false && <Alert variant="danger" className="mt-3">Failed to submit ticket. Please try again.</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TicketForm;
