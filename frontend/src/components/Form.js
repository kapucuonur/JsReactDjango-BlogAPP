import React, { useState, useEffect } from 'react';
import APIService from './APIService';
import { useCookies } from 'react-cookie';

function Form(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [token] = useCookies(['mytoken']);

  // Initialize form fields if props.article is provided
  useEffect(() => {
    if (props.article) {
      setTitle(props.article.title);
      setDescription(props.article.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [props.article]);

  const updateArticle = () => {
    APIService.UpdateArticle(props.article.id, { title, description }, token['mytoken'])
      .then((resp) => props.updatedInformation(resp))
      .catch((error) => console.log(error));
    setTitle('');
    setDescription('');
  };

  const insertArticle = () => {
    APIService.InsertArticle({ title, description }, token['mytoken'])
      .then((resp) => props.insertedInformation(resp))
      .catch((error) => console.log(error));
    setTitle('');
    setDescription('');
  };

  // Container style
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  // Input style
  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ced4da',
    borderRadius: '5px',
    fontSize: '1rem',
  };

  // Textarea style
  const textareaStyle = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ced4da',
    borderRadius: '5px',
    fontSize: '1rem',
    resize: 'vertical', // Allow vertical resizing
  };

  // Button style
  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginBottom: '1rem',
  };

  // Success button style (for update)
  const successButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745', // Green color for update button
  };

  return (
    <div style={containerStyle}>
      {props.article ? (
        <div>
          <h2 className="text-center mb-4" style={{ color: '#343a40' }}>
            {props.article.id ? 'Edit Article' : 'Create Article'}
          </h2>
          <div className="form-group">
            <label htmlFor="title" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Title
            </label>
            <input
              type="text"
              value={title}
              style={inputStyle}
              placeholder="Enter Post Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Description
            </label>
            <textarea
              value={description}
              style={textareaStyle}
              placeholder="Enter Post Description"
              rows="5"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <br />
          {props.article.id ? (
            <button onClick={updateArticle} style={successButtonStyle}>
              Update Article
            </button>
          ) : (
            <button onClick={insertArticle} style={buttonStyle}>
              Create Article
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Form;