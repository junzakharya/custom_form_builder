// frontend/src/components/FormEditor.js
import React, { useState } from 'react';

const FormEditor = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [],
    headerImage: '',
  });

  // Function to handle input change in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to add a new question to the form
  const addQuestion = () => {
    setFormData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, { type: '', content: '', image: '', choices: [], blank: '', color: '' }],
    }));
  };

  // Function to save the form to the backend
  const saveForm = () => {
    fetch('/api/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Form saved successfully:', data);
        setFormData({
          title: '',
          description: '',
          questions: [],
          headerImage: '',
        });
      })
      .catch((error) => {
        console.error('Error saving form:', error);
      });
  };

  // Implement the UI for form editor
  return (
    <div>
      <h2>Form Editor</h2>
      <div>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>
      </div>
      <div>
        <label>Header Image URL</label>
        <input type="text" name="headerImage" value={formData.headerImage} onChange={handleInputChange} />
      </div>
      {/* Render each question */}
      {formData.questions.map((question, index) => (
        <div key={index}>
          <h3>Question {index + 1}</h3>
          <div>
            <label>Question Type</label>
            <select
              name={`questions[${index}].type`}
              value={question.type}
              onChange={handleInputChange}
            >
              <option value="">Select Type</option>
              <option value="categorization">Categorization</option>
              <option value="cloze">Cloze</option>
              <option value="comprehension">Comprehension</option>
            </select>
          </div>
          <div>
            <label>Question Content</label>
            <input
              type="text"
              name={`questions[${index}].content`}
              value={question.content}
              onChange={handleInputChange}
            />
          </div>
          {/* Render additional inputs based on question type */}
          {question.type === 'categorization' && (
            <div>
              <label>Choices</label>
              <input
                type="text"
                name={`questions[${index}].choices`}
                value={question.choices.join(',')}
                onChange={handleInputChange}
              />
            </div>
          )}
          {question.type === 'cloze' && (
            <div>
              <label>Blank</label>
              <input
                type="text"
                name={`questions[${index}].blank`}
                value={question.blank}
                onChange={handleInputChange}
              />
            </div>
          )}
          {question.type === 'comprehension' && (
            <div>
              <label>Color</label>
              <input
                type="text"
                name={`questions[${index}].color`}
                value={question.color}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div>
            <label>Image URL</label>
            <input
              type="text"
              name={`questions[${index}].image`}
              value={question.image}
              onChange={handleInputChange}
            />
          </div>
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={saveForm}>Save Form</button>
    </div>
  );
};

export default FormEditor;
