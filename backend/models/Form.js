// backend/models/Form.js
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
      choices: {
        type: [String],
      },
      blank: {
        type: String,
      },
      color: {
        type: String,
      },
    },
  ],
  headerImage: {
    type: String,
  },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
