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
      type: String,
      content: String,
      image: String,
      choices: [String],
      categories: [String],
    },
  ],
  headerImage: String,
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
