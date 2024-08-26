let questions = { react: [], java: [] };

let testAttempts = [];
let nextTestAttemptId = 1;

exports.addQuestion = (req, res) => {
  const { skill, question, options, correctAnswer } = req.body;
  if (questions[skill].length < 10) {
    questions[skill].push({ question, options, correctAnswer });
    res.status(200).send({ message: 'Question added successfully.' });
  } else {
    res.status(400).send({ message: 'Question limit reached.' });
  }
};

exports.getQuestions = (req, res) => {
  const { skill } = req.query;
  res.status(200).send(questions[skill]);
};

exports.deleteQuestion = (req, res) => {
  console.log('DELETE request received for:', req.params);
  const { skill, index } = req.params;

  if (questions[skill] && questions[skill][index]) {
    questions[skill].splice(index, 1); // Remove the question at the specified index
    res.status(200).send({ message: 'Question deleted successfully.' });
  } else {
    res.status(404).send({ message: 'Question not found.' });
  }
};

exports.recordTestAttempt = (req, res) => {
  const { participantName, skill, score } = req.body;
  const testAttempt = { 
    id: nextTestAttemptId++,
    participantName,
    skill,
    score,
    testDate: new Date(),
  };
  testAttempts.push(testAttempt);
  res.status(200).send({ message: 'Test attempt recorded successfully.' });
};

exports.getParticipants = (req, res) => {
  res.status(200).json(testAttempts);
};