import React, { useState } from 'react';

const FormEditor = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [],
    headerImage: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addQuestion = () => {
    setFormData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, { type: '', content: '', image: '', choices: [], categories: [] }],
    }));
  };

  const handleQuestionTypeChange = (index, type) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[index].type = type;
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleBlankUnderline = (index) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[index].blankUnderlined = true;
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const addOption = (index) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[index].choices.push('');
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const addCategory = (index) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[index].categories.push('');
      return { ...prevData, questions: updatedQuestions };
    });
  };

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
      {formData.questions.map((question, index) => (
        <div key={index}>
          <h3>Question {index + 1}</h3>
          <div>
            <label>Question Type</label>
            <select
              name={`questions[${index}].type`}
              value={question.type}
              onChange={(e) => handleQuestionTypeChange(index, e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="categorized">Categorized</option>
              <option value="fill-in-the-blank">Fill in the Blank</option>
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
          {question.type === 'categorized' && (
            <div>
              <h4>Categories</h4>
              <ul>
                {question.categories.map((category, catIndex) => (
                  <li key={catIndex}>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => {
                        const updatedCategories = [...question.categories];
                        updatedCategories[catIndex] = e.target.value;
                        setFormData((prevData) => {
                          const updatedQuestions = [...prevData.questions];
                          updatedQuestions[index].categories = updatedCategories;
                          return { ...prevData, questions: updatedQuestions };
                        });
                      }}
                    />
                  </li>
                ))}
              </ul>
              <button onClick={() => addCategory(index)}>Add Category</button>
            </div>
          )}
          {question.type === 'fill-in-the-blank' && (
            <div>
              <p>
                {question.content.split(' ').map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    style={{ textDecoration: question.blankUnderlined ? 'underline' : 'none' }}
                    onClick={() => handleBlankUnderline(index)}
                  >
                    {word}{' '}
                  </span>
                ))}
              </p>
              <h4>Options for the Blank</h4>
              <ul>
                {question.choices.map((choice, choiceIndex) => (
                  <li key={choiceIndex}>
                    <input
                      type="text"
                      value={choice}
                      onChange={(e) => {
                        const updatedChoices = [...question.choices];
                        updatedChoices[choiceIndex] = e.target.value;
                        setFormData((prevData) => {
                          const updatedQuestions = [...prevData.questions];
                          updatedQuestions[index].choices = updatedChoices;
                          return { ...prevData, questions: updatedQuestions };
                        });
                      }}
                    />
                  </li>
                ))}
              </ul>
              <button onClick={() => addOption(index)}>Add Option</button>
            </div>
          )}
          {question.type === 'comprehension' && (
            <div>
              <h4>MCQ Questions for Comprehension</h4>
              <ul>
                {question.choices.map((choice, choiceIndex) => (
                  <li key={choiceIndex}>
                    <input
                      type="text"
                      value={choice}
                      onChange={(e) => {
                        const updatedChoices = [...question.choices];
                        updatedChoices[choiceIndex] = e.target.value;
                        setFormData((prevData) => {
                          const updatedQuestions = [...prevData.questions];
                          updatedQuestions[index].choices = updatedChoices;
                          return { ...prevData, questions: updatedQuestions };
                        });
                      }}
                    />
                  </li>
                ))}
              </ul>
              <button onClick={() => addOption(index)}>Add MCQ Question</button>
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
