import './App.css';
import ArticleList from './components/ArticleList';
import { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Form from './components/Form';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function App() {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState('');
  const [token, setToken] = useState(localStorage.getItem('mytoken') || ''); // Get token from local storage
  let navigate = useNavigate();

  // Function to get the base URL
  const getBaseURL = () => {
    return import.meta.env.VITE_API_URL || 'http://localhost:8000';
  };

  // Fetch articles
  useEffect(() => {
    fetch(`${getBaseURL()}/api/articles/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}` // Use the token from local storage
      }
    })
      .then(resp => resp.json())
      .then(resp => setArticles(resp))
      .catch(error => console.log(error));
  }, [token]);

  // Edit button handler
  const editBtn = (article) => {
    setEditArticle(article);
  };

  // Update article
  const updatedInformation = (article) => {
    const new_article = articles.map(myarticle => {
      if (myarticle.id === article.id) {
        return article;
      } else {
        return myarticle;
      }
    });
    setArticles(new_article);
  };

  // Create new article form
  const articleForm = () => {
    setEditArticle({ title: '', description: '' });
  };

  // Insert new article
  const insertedInformation = (article) => {
    const new_articles = [...articles, article];
    setArticles(new_articles);
  };

  // Delete article
  const deleteBtn = (article) => {
    const new_article = articles.filter(myarticle => {
      if (myarticle.id === article.id) {
        return false;
      }
      return true;
    });
    setArticles(new_article);
  };

  // Check token and redirect
  useEffect(() => {
    if (!token) {
      navigate('/'); // Redirect to login if no token
    } else {
      navigate('/articles'); // Redirect to articles if token exists
    }
  }, [token, navigate]);

  // Logout handler
  const logoutBtn = () => {
    localStorage.removeItem('mytoken'); // Remove token from local storage
    setToken(''); // Clear token state
    navigate('/'); // Redirect to login
  };

  return (
    <div className="App bg-gray-100 min-h-screen">
      <NavBar logoutBtn={logoutBtn} />
      <br />
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            onClick={articleForm}
          >
            Create Post
          </button>
        </div>
        <ArticleList articles={articles} editBtn={editBtn} deleteBtn={deleteBtn} />
        <Form
          article={editArticle}
          updatedInformation={updatedInformation}
          insertedInformation={insertedInformation}
        />
      </div>
    </div>
  );
}

export default App;