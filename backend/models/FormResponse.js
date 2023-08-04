const mongoose = require('mongoose');

const formResponseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },
  responses: {
    type: Map,
    of: String,
    required: true,
  },
});

const FormResponse = mongoose.model('FormResponse', formResponseSchema);

module.exports = FormResponse;
