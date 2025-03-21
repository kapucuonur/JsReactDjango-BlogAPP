import './App.css';
import ArticleList from './components/ArticleList';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/NavBar';
import Form from './components/Form';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Define the base URL
const BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://jsreactdjango-blogapp.onrender.com' 
    : 'http://localhost:8000';

function App() {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState(null);
  const [token, setToken, removeToken] = useCookies(['mytoken']);
  let navigate = useNavigate();

  useEffect(() => {
    if (!token['mytoken']) {
      console.log('No token found, redirecting to login...');
      navigate('/');
      return;
    }

    fetch(`${BASE_URL}/api/articles/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mytoken']}`
      }
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Unauthorized');
        }
        return resp.json();
      })
      .then((resp) => setArticles(resp))
      .catch((error) => {
        console.error('Error fetching articles:', error);
        setArticles([]);
      });
  }, [token, navigate]);

  const editBtn = (article) => {
    setEditArticle(article);
  };

  const updatedInformation = (article) => {
    const new_articles = articles.map((myarticle) => {
      if (myarticle.id === article.id) {
        return article;
      } else {
        return myarticle;
      }
    });
    setArticles(new_articles);
  };

  const articleForm = () => {
    setEditArticle({ title: '', description: '' });
  };

  const insertedInformation = (article) => {
    const new_articles = [...articles, article];
    setArticles(new_articles);
  };

  const deleteBtn = (article) => {
    const new_articles = articles.filter((myarticle) => myarticle.id !== article.id);
    setArticles(new_articles);
  };

  useEffect(() => {
    const user_token = token['mytoken'];
    console.log('User token is', user_token);
    if (!user_token) {
      navigate('/');
    } else {
      navigate('/articles');
    }
  }, [token, navigate]);

  const logoutBtn = () => {
    removeToken('mytoken');
  };

  return (
    <div className="App">
      <NavBar />
      <br />

      <div className="row">
        <div className="col">
          <button className="btn btn-primary" onClick={articleForm}>
            Create Post
          </button>
        </div>
      </div>

      <ArticleList articles={articles} editBtn={editBtn} deleteBtn={deleteBtn} />
      <Form
        article={editArticle}
        updatedInformation={updatedInformation}
        insertedInformation={insertedInformation}
      />
    </div>
  );
}

export default App;