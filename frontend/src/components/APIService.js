const BASE_URL = 'https://jsreactdjango-blogapp.onrender.com' || 'http://127.0.0.1:8000';

export default class APIService {
    static async UpdateArticle(article_id, body, token) {
        try {
            const response = await fetch(`${BASE_URL}/api/articles/${article_id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(body)
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating article:', error);
        }
    }

    static async InsertArticle(body, token) {
        try {
            const response = await fetch(`${BASE_URL}/api/articles/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(body)
            });
            return await response.json();
        } catch (error) {
            console.error('Error inserting article:', error);
        }
    }

    static async DeleteArticle(article_id, token) {
        try {
            const response = await fetch(`${BASE_URL}/api/articles/${article_id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            });
            if (response.status === 204) return {}; // No Content response
            return await response.json();
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    }

    static async LoginUser(body) {
        try {
            const response = await fetch(`${BASE_URL}/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
    
            const text = await response.text(); // Log response
            console.log('Raw response:', text);
    
            if (!response.ok) {
                throw new Error(`Login failed: ${response.status} ${response.statusText}`);
            }
    
            const data = JSON.parse(text);
            if (!data.token) {
                throw new Error('Token missing in response');
            }
    
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            console.error('Login error:', error);
        }
    }
    

    static async RegisterUser(body) {
        try {
            const response = await fetch(`${BASE_URL}/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            return await response.json();
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }
}