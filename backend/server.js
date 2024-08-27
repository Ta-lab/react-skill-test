require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 10000;

// Import routes
const questionRoutes = require('./routes/questionRoutes');

// Use routes
app.use('/api/questions', questionRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the backend service!');
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
