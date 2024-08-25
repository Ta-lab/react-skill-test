import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestScreen = ({ skill, userName }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('http://localhost:5000/api/questions', {
        params: { skill },
      });
      setQuestions(response.data);
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
  };

  return (
    <div>
      <h2>{userName}'s {skill} Test</h2>
      {questions.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
          {q.options.map((option, i) => (
            <label key={i}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                onChange={() => handleAnswerChange(index, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={calculateScore}>Submit</button>
      {score !== null && <h3>Your Score: {score}/{questions.length}</h3>}
    </div>
  );
};

export default TestScreen;
