import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Card, Button } from 'react-bootstrap';

const ParticipantList = ({ setView }) => {
  const [participants, setParticipants] = useState([]);

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
              </tr>
            </thead>
            <tbody>
              {participants.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No participants found
                  </td>
                </tr>
              ) : (
                participants.map((participant, index) => (
                  <tr key={participant.id}>
                    <td>{index + 1}</td>
                    <td>{participant.participantName}</td>
                    <td>{participant.skill}</td>
                    <td>{participant.score}</td>
                    <td>{new Date(participant.testDate).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ParticipantList;
