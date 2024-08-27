import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, ListGroup, Badge, Modal } from 'react-bootstrap';

const QuestionList = ({ skill, setView }) => {
    const [questions, setQuestions] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/questions?skill=${skill}`);
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [skill]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/questions/${skill}/${deleteIndex}`);
            setQuestions(questions.filter((_, i) => i !== deleteIndex));
            setShowConfirm(false); // Close the confirmation modal after deletion
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    const confirmDelete = (index) => {
        setDeleteIndex(index);
        setShowConfirm(true); 
    };

    return (
        <Container className="mt-4">
            <Card className="shadow-sm p-4">
                <Card.Body>
                    <Button onClick={() => setView('')} variant="outline-secondary" className="mb-4">
                        Back
                    </Button>
                    <h2 className="mb-4 text-center">Questions for {skill}</h2>
                    <div className="d-flex flex-column align-items-center">
                        {questions && questions.length > 0 ? (
                            questions.map((question, index) => (
                                <Card key={index} className="mb-4 w-100 shadow-sm border-dark">
                                    <Card.Header as="h5" className="bg-light text-dark border-bottom d-flex justify-content-between align-items-center">
                                        <span>Q{index + 1}: {question.question}</span>
                                        <Button variant="danger" onClick={() => confirmDelete(index)}>
                                            Delete
                                        </Button>
                                    </Card.Header>
                                    <ListGroup variant="flush">
                                        {question.options.map((option, idx) => (
                                            <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                                                {option}
                                                {option === question.correctAnswer && (
                                                    <Badge bg="success" text="light" className="ms-2">
                                                        Correct Answer
                                                    </Badge>
                                                )}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center">No questions available for {skill}.</p>
                        )}
                    </div>
                </Card.Body>
            </Card>

            {/* Confirmation Modal */}
            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this question?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default QuestionList;
