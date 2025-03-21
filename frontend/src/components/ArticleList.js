import React from 'react';
import APIService from './APIService';
import { useCookies } from 'react-cookie';

function ArticleList(props) {
    const [token] = useCookies(['mytoken']);

    const editBtn = (article) => {
        props.editBtn(article);
    };

    const deleteBtn = (article) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            APIService.DeleteArticle(article.id, token['mytoken'])
                .then(() => props.deleteBtn(article))
                .catch((error) => console.log(error));
        }
    };

    return (
        <div className="container mt-4">
            {props.articles && props.articles.length > 0 ? (
                props.articles.map((article) => (
                    <div key={article.id} className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h1 className="card-title">{article.title}</h1>
                            <p className="card-text">{article.description}</p>

                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => editBtn(article)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteBtn(article)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-muted">
                    No articles found. Create one to get started!
                </div>
            )}
        </div>
    );
}

export default ArticleList;