// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const formRoutes = require('./routes/formRoutes');
const formResponseRoutes = require('./routes/formResponseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my_form_builder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use('/api/forms', formRoutes);
app.use('/api/form-responses', formResponseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
