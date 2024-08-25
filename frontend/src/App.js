import React, { useState } from 'react';
import UserInfo from './components/UserInfo';
import TestScreen from './components/TestScreen';
import QuestionSetup from './components/QuestionSetups';
import QuestionList from './components/QuestionList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Card, Form, Alert } from 'react-bootstrap';

function App() {
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const [skill, setSkill] = useState('');
  const [view, setView] = useState(''); // View can be 'setup', 'test', or 'list'
  const [error, setError] = useState('');

  const handleViewChange = (newView) => {
    if (!skill) {
      setError('Please select a skill before proceeding.');
      setTimeout(() => {
        setError(''); // Clear the error after 3 seconds
      }, 3000);
      return;
    }
    setError(''); // Clear the error if validation passes
    setView(newView);
  };

  return (
    <Container className="mt-5">
      {!user ? (
        <UserInfo setUser={setUser} setRole={setRole} setView={setView} />
      ) : (
        <>
          {view === '' && (
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline-secondary"
                  className="mb-4"
                >
                  Back
                </Button>
                <div className="mb-4 text-center">
                  <Form.Group controlId="skillSelect">
                    <Form.Label>Select Skill</Form.Label>
                    <Form.Select
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    >
                      <option value="">Select Skill</option>
                      <option value="react">React</option>
                      <option value="java">Java</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                {error && (
                  <Alert variant="danger" className="text-center">
                    {error}
                  </Alert>
                )}
                <div className="d-flex justify-content-center mt-4">
                  {role === 'setter' && (
                    <>
                      <Button
                        onClick={() => handleViewChange('setup')}
                        variant="primary"
                        className="me-2"
                      >
                        Add Question
                      </Button>
                      <Button
                        onClick={() => handleViewChange('list')}
                        variant="secondary"
                      >
                        View Questions
                      </Button>
                    </>
                  )}
                  {role === 'taker' && (
                    <Button
                      onClick={() => handleViewChange('test')}
                      variant="primary"
                    >
                      Take Test
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          )}
          {view === 'setup' && role === 'setter' && <QuestionSetup skill={skill} setView={setView} />}
          {view === 'list' && role === 'setter' && <QuestionList skill={skill} setView={setView} />}
          {view === 'test' && role === 'taker' && <TestScreen skill={skill} userName={user} setView={setView} />}
        </>
      )}
    </Container>
  );
}

export default App;
