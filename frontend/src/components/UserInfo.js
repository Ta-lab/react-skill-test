import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

const UserInfo = ({ setUser, setRole, setView }) => {
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [message, setMessage] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (message) {
      setMessage(''); // Clear the message if the user selects a role
    }
  };

  const handleSubmit = () => {
    if (name.trim() && selectedRole) {
      setUser(name);
      setRole(selectedRole);
      setView('');
    } else {
      setMessage(
        !name.trim() ? 'Please enter your name.' : 'Please select a role.'
      );
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };


  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-3">
      <Card className="shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Enter Your Information</Card.Title>

          <Form.Group className="mb-3 shadow-sm">
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              isInvalid={!name.trim() && message}
            />
            <Form.Control.Feedback type="invalid">
              {message.includes('name') && message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex flex-wrap justify-content-between mb-4">
            <Card
              onClick={() => handleRoleSelect('setter')}
              className={`d-flex flex-column align-items-center p-3 rounded shadow-lg ${selectedRole === 'setter' ? 'bg-light border-primary' : 'bg-white border-light'} cursor-pointer`}
              style={{ width: '45%', maxWidth: '200px' }}
            >
              <Card.Body className="text-center">
                <Card.Title as="h5">Question Creator</Card.Title>
              </Card.Body>
            </Card>

            <Card
              onClick={() => handleRoleSelect('taker')}
              className={`d-flex flex-column align-items-center p-3 rounded shadow-lg ${selectedRole === 'taker' ? 'bg-light border-primary' : 'bg-white border-light'} cursor-pointer`}
              style={{ width: '45%', maxWidth: '200px' }}
            >
              <Card.Body className="text-center">
                <Card.Title as="h5">Assessment Participant</Card.Title>
              </Card.Body>
            </Card>
          </div>
          {message.includes('role') && (
            <div className="text-danger text-center mb-3">
              {message}
            </div>
          )}
          <Button onClick={handleSubmit} variant="primary" className="w-100">Submit</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserInfo;
