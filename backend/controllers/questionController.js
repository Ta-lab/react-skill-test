// backend/controllers/questionController.js

let questions = { react: [], java: [] };

exports.addQuestion = (req, res) => {
  const { skill, question, options, correctAnswer } = req.body;
  if (questions[skill].length < 2) {
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
