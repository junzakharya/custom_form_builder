// backend/models/FormResponse.js
const mongoose = require('mongoose');

const formResponseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },
  responses: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

const FormResponse = mongoose.model('FormResponse', formResponseSchema);

module.exports = FormResponse;
