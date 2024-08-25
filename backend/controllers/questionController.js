let questions = { react: [], java: [] };

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