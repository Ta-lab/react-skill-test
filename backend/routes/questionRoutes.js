const express = require('express');
const { addQuestion, getQuestions, deleteQuestion, recordTestAttempt, getParticipants } = require('../controllers/questionController');
const router = express.Router();

router.post('/', addQuestion);
router.get('/', getQuestions);
router.delete('/:skill/:index', deleteQuestion);

router.post('/test-attempts', recordTestAttempt);
router.get('/test-attempts-list', getParticipants);

module.exports = router;
