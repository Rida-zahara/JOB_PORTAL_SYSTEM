const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/jobportal')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/jobs', jobRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
