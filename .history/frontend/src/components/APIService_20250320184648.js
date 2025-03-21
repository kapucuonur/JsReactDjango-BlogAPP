// Define the base URL
const BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://jsreactdjango-blogapp.onrender.com' 
    : 'http://localhost:8000';

export default class APIService {
    static UpdateArticle(article_id, body, token) {
        return fetch(`${BASE_URL}/api/articles/${article_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => {
            if (!resp.ok) {
                throw new Error('Failed to update article');
            }
            return resp.json();
        });
    }

    static InsertArticle(body, token) {
        return fetch(`${BASE_URL}/api/articles/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => {
            if (!resp.ok) {
                throw new Error('Failed to insert article');
            }
            return resp.json();
        });
    }

    static DeleteArticle(article_id, token) {
        return fetch(`${BASE_URL}/api/articles/${article_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }).then(resp => {
            if (!resp.ok) {
                throw new Error('Failed to delete article');
            }
            return resp.json();
        });
    }

    static LoginUser(body) {
        return fetch(`${BASE_URL}/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(resp => {
            if (!resp.ok) {
                throw new Error('Failed to login');
            }
            return resp.json();
        });
    }

    static RegisterUser(body) {
        return fetch(`${BASE_URL}/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp => {
            if (!resp.ok) {
                throw new Error('Failed to register');
            }
            return resp.json();
        });
    }
}