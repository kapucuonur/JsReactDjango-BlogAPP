import './App.css';
import ArticleList from './components/ArticleList';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './components/NavBar';
import Form from './components/Form';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function App() {
  const [articles, setArticles] = useState([]);
  const [editArticle, setEditArticle] = useState(null);
  const [token, setToken, removeToken] = useCookies(['mytoken']);
  let navigate = useNavigate();

  useEffect(() => {
    if (!token['mytoken']) {
      navigate('/');
    } else {
      fetchArticles();
    }
  }, [token]);

  const fetchArticles = () => {
    fetch('http://localhost:8000/api/articles/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mytoken']}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => setArticles(data))
      .catch((error) => console.log(error));
  };

  const editBtn = (article) => {
    setEditArticle(article);
  };

  const updatedInformation = (article) => {
    setArticles(articles.map((a) => (a.id === article.id ? article : a)));
  };

  const articleForm = () => {
    setEditArticle({ title: '', description: '' });
  };

  const insertedInformation = (article) => {
    setArticles([...articles, article]);
  };

  const deleteBtn = (article) => {
    setArticles(articles.filter((a) => a.id !== article.id));
  };

  const logoutBtn = () => {
    removeToken(['mytoken']);
    navigate('/');
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
          <button className="btn btn-danger ml-2" onClick={logoutBtn}>
            Logout
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
