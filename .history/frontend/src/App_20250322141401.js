import './App.css';
import ArticleList from './components/ArticleList';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/NavBar';
import Form from './components/Form';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Define the base URL
const BASE_URL = 'https://jsreactdjango-blogapp.onrender.com/api';

function App() {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState(null);
  const [token, setToken, removeToken] = useCookies(['mytoken']);
  let navigate = useNavigate();

  // Fetch Articles
  useEffect(() => {
    if (!token['mytoken']) {
      console.log('No token found, redirecting to login...');
      navigate('/');
      return;
    }

    fetch(`${BASE_URL}/articles/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mytoken']}`
      }
    })
      .then((resp) => {
        if (resp.status === 401) {
          console.log('Unauthorized, logging out...');
          removeToken('mytoken');
          navigate('/');
          return;
        }
        return resp.json();
      })
      .then((resp) => setArticles(resp))
      .catch((error) => {
        console.error('Error fetching articles:', error);
        setArticles([]);
      });
  }, [token, navigate, removeToken]);

  // Redirect based on token
  useEffect(() => {
    if (token['mytoken']) {
      navigate('/articles');
    } else {
      navigate('/');
    }
  }, [token, navigate]);

  const editBtn = (article) => {
    setEditArticle(article);
  };

  const updatedInformation = (article) => {
    const new_articles = articles.map((myarticle) =>
      myarticle.id === article.id ? article : myarticle
    );
    setArticles(new_articles);
  };

  const articleForm = () => {
    setEditArticle({ title: '', description: '' });
  };

  const insertedInformation = (article) => {
    setArticles([...articles, article]);
  };

  const deleteBtn = (article) => {
    setArticles(articles.filter((myarticle) => myarticle.id !== article.id));
  };

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
