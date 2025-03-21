// Define the base URL
const BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://jsreactdjango-blogapp.onrender.com' 
    : 'http://127.0.0.1:8000';

export default class APIService {
    static UpdateArticle(article_id, body, token) {
        return fetch(`${BASE_URL}/api/articles/${article_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json());
    }

    static InsertArticle(body, token) {
        return fetch(`${BASE_URL}/api/articles/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json());
    }

    static DeleteArticle(article_id, token) {
        return fetch(`${BASE_URL}/api/articles/${article_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });
    }

    static LoginUser(body) {
        return fetch(`${BASE_URL}/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json());
    }

    static RegisterUser(body) {
        return fetch(`${BASE_URL}/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json());
    }
}