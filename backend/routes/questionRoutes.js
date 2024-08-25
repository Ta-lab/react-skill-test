const express = require('express');
const { addQuestion, getQuestions, deleteQuestion } = require('../controllers/questionController');
const router = express.Router();

router.post('/', addQuestion);
router.get('/', getQuestions);
router.delete('/:skill/:index', deleteQuestion);

module.exports = router;
