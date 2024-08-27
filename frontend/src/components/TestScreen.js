import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, ListGroup, Modal, Badge } from 'react-bootstrap';

const TestScreen = ({ skill, userName, setView }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [viewAnswers, setViewAnswers] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/questions`, {
          params: { skill },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [skill]);

  const handleAnswerChange = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (q.correctAnswer === answers[index]) {
        correct += 1;
      }
    });
    setScore(correct);
    setSubmitted(true); // Set the submitted state to true to hide questions
    recordTestAttempt(correct);
  };

  const recordTestAttempt = async (finalScore) => {
    try {
      await axios.post(`${API_URL}/api/questions/test-attempts`, {
        participantName: userName,
        skill,
        score: finalScore,
      });
      console.log('Test attempt recorded successfully.');
    } catch (error) {
      console.error('Error recording test attempt:', error);
    }
  };

  const handleSubmit = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    calculateScore();
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4">
        <Card.Body>
          <Button variant="secondary" onClick={() => setView('')} className="mb-4">
            Back
          </Button>
          <h2 className="text-center mb-4">
            {userName}'s {skill} Test
          </h2>
          {!submitted && (
            <>
              {questions.length === 0 ? (
                <p className="text-center">No Questions Available</p>
              ) : (
                questions.map((q, index) => (
                  <Card className="mb-3" key={index}>
                    <Card.Header as="h5">
                      {index + 1}. {q.question}
                    </Card.Header>
                    <ListGroup variant="flush">
                      {q.options.map((option, i) => (
                        <ListGroup.Item
                          key={i}
                          className={`d-flex align-items-center ${answers[index] === option ? 'active' : ''}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleAnswerChange(index, option)}
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={answers[index] === option}
                            onChange={() => handleAnswerChange(index, option)}
                            className="form-check-input me-2"
                          />
                          {option}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                ))
              )}
              {questions.length > 0 && (
                <Button variant="primary" onClick={handleSubmit} className="w-100 mt-3">
                  Submit
                </Button>
              )}
            </>
          )}
          {submitted && score !== null && (
            <>
              <div className="mt-4 text-center">
                <h3>Your Score: {score}/{questions.length}</h3>
              </div>
              <Button
                variant="info"
                className="w-100 mt-3"
                onClick={() => setViewAnswers(true)}
              >
                View Correct Answers
              </Button>
            </>
          )}
          {viewAnswers && (
            <div className="mt-4">
              {questions.map((q, index) => (
                <Card className="mb-3" key={index}>
                  <Card.Header as="h5">
                    {index + 1}. {q.question}
                  </Card.Header>
                  <ListGroup variant="flush">
                    {q.options.map((option, i) => (
                      <ListGroup.Item
                        key={i}
                        className={`d-flex align-items-center ${answers[index] === option ? 'bg-warning' : ''} ${q.correctAnswer === option ? 'bg-success text-white' : ''}`}
                      >
                        {option}
                        {q.correctAnswer === option && (
                          <Badge bg="success" className="ms-auto">Correct</Badge>
                        )}
                        {answers[index] === option && q.correctAnswer !== option && (
                          <Badge bg="danger" className="ms-auto">Your Answer</Badge>
                        )}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to submit your answers?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TestScreen;
