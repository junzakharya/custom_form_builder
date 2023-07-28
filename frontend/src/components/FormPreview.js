// frontend/src/components/FormPreview.js
import React, { useEffect, useState } from 'react';

const FormPreview = () => {
  // State to store form data fetched from the backend
  const [formData, setFormData] = useState([]);

  // Function to fetch form data from the backend
  useEffect(() => {
    fetch('/api/forms')
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });
  }, []);

  // Implement the UI for form preview
  return (
    <div>
      <h2>Form Preview</h2>
      {formData.map((form, index) => (
        <div key={index}>
          <h3>{form.title}</h3>
          <p>{form.description}</p>
          {/* Display questions based on their types */}
          {form.questions.map((question, qIndex) => (
            <div key={qIndex}>
              <p>{question.content}</p>
              {question.image && <img src={question.image} alt={`Question ${qIndex + 1}`} />}
              {question.type === 'categorization' && (
                <div>
                  {/* Display categorization options */}
                  {question.choices.map((choice, cIndex) => (
                    <div key={cIndex}>
                      <input type="radio" name={`question-${qIndex}`} value={choice} />
                      <label>{choice}</label>
                    </div>
                  ))}
                </div>
              )}
              {question.type === 'cloze' && (
                <div>
                  {/* Display fill-in-the-blank input */}
                  <input type="text" placeholder={question.blank} />
                </div>
              )}
              {question.type === 'comprehension' && (
                <div>
                  {/* Display comprehension question input */}
                  <input type="text" placeholder={`The ${question.color} fox is`} />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FormPreview;
