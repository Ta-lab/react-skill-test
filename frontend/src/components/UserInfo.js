import React, { useState } from 'react';
import { Button, Card, Form, Container } from 'react-bootstrap';

const UserInfo = ({ setUser, setRole, setView }) => {
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [message, setMessage] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setMessage('');
  };

  const handleSubmit = () => {
    if (!selectedRole) {
      setMessage('Please select a role.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (selectedRole === 'taker' && !name.trim()) {
      setMessage('Please enter your name.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setUser(selectedRole === 'taker' ? name : 'Admin');
    setRole(selectedRole);
    setView('');
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h1 className="mb-4 text-center">Skill Test App</h1>
      <Card className="shadow-lg p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Select Your Role</Card.Title>

          <div className="d-flex justify-content-around mb-4">
            <Card
              onClick={() => handleRoleSelect('setter')}
              className={`d-flex flex-column align-items-center p-3 rounded shadow-lg ${selectedRole === 'setter' ? 'bg-light border-primary' : 'bg-white border-light'} cursor-pointer`}
              style={{ width: '45%', cursor: 'pointer' }}
            >
              <Card.Body className="text-center">
                <Card.Title as="h5">Admin / Question Creator</Card.Title>
              </Card.Body>
            </Card>

            <Card
              onClick={() => handleRoleSelect('taker')}
              className={`d-flex flex-column align-items-center p-3 rounded shadow-lg ${selectedRole === 'taker' ? 'bg-light border-primary' : 'bg-white border-light'} cursor-pointer`}
              style={{ width: '45%', cursor: 'pointer' }}
            >
              <Card.Body className="text-center">
                <Card.Title as="h5">Assessment Participant</Card.Title>
              </Card.Body>
            </Card>
          </div>

          {selectedRole === 'taker' && (
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                isInvalid={!name.trim() && message}
              />
            </Form.Group>
          )}

          {message && <div className="alert alert-danger mb-3 text-center">{message}</div>}

          <Button onClick={handleSubmit} variant="primary" className="w-100">
            Submit
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserInfo;
