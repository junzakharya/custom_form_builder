import React, { useEffect, useState } from 'react';

const FormRenderer = () => {
  const [formData, setFormData] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    // Fetch form data from the backend
    fetch('/api/forms')
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });

    // Fetch user responses from the backend
    fetch('/api/responses')
      .then((response) => response.json())
      .then((data) => {
        setResponses(data);
      })
      .catch((error) => {
        console.error('Error fetching responses:', error);
      });
  }, []);

  // Function to render categorized question options
  const renderCategorizedOptions = (question) => {
    return question.categories.map((category, index) => (
      <div key={index}>
        <label>{category}</label>
        <div>
          {question.choices.map((choice, choiceIndex) => (
            <div key={choiceIndex}>
              <input
                type="radio"
                name={`question-${question._id}`}
                value={choice}
                checked={responses[question._id] === choice}
                readOnly
              />
              <label>{choice}</label>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  // Function to render fill-in-the-blank question
  const renderFillInTheBlank = (question) => {
    const words = question.content.split(' ');
    return words.map((word, index) => (
      <span key={index}>
        {responses[question._id] === word ? <u>{word}</u> : `${word} `}
      </span>
    ));
  };

  // Function to render comprehension MCQ questions
  const renderComprehensionMCQs = (question) => {
    return question.choices.map((choice, index) => (
      <div key={index}>
        <input
          type="radio"
          name={`question-${question._id}`}
          value={choice}
          checked={responses[question._id] === choice}
          readOnly
        />
        <label>{choice}</label>
      </div>
    ));
  };

  // Function to render each question based on its type
  const renderQuestion = (question) => {
    switch (question.type) {
      case 'categorized':
        return renderCategorizedOptions(question);
      case 'fill-in-the-blank':
        return renderFillInTheBlank(question);
      case 'comprehension':
        return renderComprehensionMCQs(question);
      default:
        return null;
    }
  };

  // Function to render the entire form
  const renderForm = (form) => {
    return (
      <div key={form._id}>
        <h3>{form.title}</h3>
        <p>{form.description}</p>
        {form.questions.map((question) => (
          <div key={question._id}>
            <h4>{question.content}</h4>
            {renderQuestion(question)}
          </div>
        ))}
        <hr />
      </div>
    );
  };

  return (
    <div>
      <h2>Form Renderer</h2>
      {formData.map(renderForm)}
    </div>
  );
};

export default FormRenderer;
