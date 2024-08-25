import React, { useState } from 'react';
import axios from 'axios';


const QuestionSetup = ({ skill }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const submitQuestion = async () => {
    const payload = { skill, question, options, correctAnswer };
    try {
      const response = await axios.post('http://localhost:5000/api/questions', payload);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Setup Questions for {skill}</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter the question"
      />
      {options.map((opt, index) => (
        <input
          key={index}
          type="text"
          value={opt}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          placeholder={`Option ${index + 1}`}
        />
      ))}
      <input
        type="text"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        placeholder="Enter the correct answer"
      />
      <button onClick={submitQuestion}>Submit Question</button>
    </div>
  );
};

export default QuestionSetup;
