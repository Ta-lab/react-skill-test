import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form, Alert, Row, Col } from 'react-bootstrap';

const QuestionSetup = ({ skill, setView }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [message, setMessage] = useState('');
  const backButtonRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const submitQuestion = async () => {
    if (!question || !correctAnswer || options.some((opt) => !opt)) {
      setMessage('Please fill in all fields.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }


    const payload = { skill, question, options, correctAnswer };
    try {
      const response = await axios.post(`${API_URL}/api/questions`, payload);
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage('');
        if (backButtonRef.current) {
          backButtonRef.current.click(); // Programmatically click the back button
        }
      }, 3000);
    } catch (error) {
      setMessage('Error submitting the question.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm p-4">
        <Card.Body>
          <Button
            ref={backButtonRef} // Attach the ref to the button
            onClick={() => setView('')}
            variant="outline-secondary"
            className="mb-4"
          >
            Back
          </Button>
          <Card.Title className="text-center mb-4">Setup Questions for {skill}</Card.Title>
          <Form>
            <Form.Group controlId="question" className="mb-4">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter the question"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Options</Form.Label>
              <Row>
                {options.map((opt, index) => (
                  <Col key={index} md={6} className="mb-3">
                    <Form.Control
                      type="text"
                      value={opt}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>
            <Form.Group controlId="correctAnswer" className="mb-4">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Control
                type="text"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Enter the correct answer"
              />
            </Form.Group>
            <Button onClick={submitQuestion} variant="primary" className="w-100">
              Submit Question
            </Button>
          </Form>
          {message && (
            <Alert variant="info" className="mt-3 text-center">
              {message}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default QuestionSetup;
