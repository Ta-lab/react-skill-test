import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Card, Button, Modal } from 'react-bootstrap';

const ParticipantList = ({ setView }) => {
    const [participants, setParticipants] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [participantIndexToDelete, setParticipantIndexToDelete] = useState(null);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/questions/test-attempts-list');
                setParticipants(response.data);
            } catch (error) {
                console.error('Error fetching participants:', error);
            }
        };
        fetchParticipants();
    }, []);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/questions/test-attempts/participants/${participantIndexToDelete}`);
            setParticipants(participants.filter((_, index) => index !== participantIndexToDelete));
            setShowConfirm(false);
        } catch (error) {
            console.error('Error deleting participant:', error);
        }
    };

    const confirmDelete = (index) => {
        setParticipantIndexToDelete(index);
        setShowConfirm(true);
    };

    return (
        <Container className="mt-5">
            <Card className="shadow-lg p-4">
                <Card.Body>
                    <Button variant="secondary" onClick={() => setView('')} className="mb-4">
                        Back
                    </Button>
                    <h2 className="text-center mb-4">Participant Scores</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Skill</th>
                                <th>Score</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participants.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No participants found
                                    </td>
                                </tr>
                            ) : (
                                participants.map((participant, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{participant.participantName}</td>
                                        <td>{participant.skill}</td>
                                        <td>{participant.score}</td>
                                        <td>{new Date(participant.testDate).toLocaleString()}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={() => confirmDelete(index)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this participant's score?
                </Modal.Body>
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

export default ParticipantList;
