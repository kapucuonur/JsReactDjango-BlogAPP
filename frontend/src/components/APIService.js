const baseUrl = process.env.REACT_APP_BASE_URL;

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    return response.json();
};

const fetchWithTimeout = (url, options, timeout = 10000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), timeout)
        )
    ]);
};

export default class APIService {
    static UpdateArticle(article_id, body, token) {
        return fetchWithTimeout(`${baseUrl}/api/articles/${article_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        })
        .then(handleResponse)
        .catch(error => {
            console.error('Error updating article:', error);
            throw error;
        });
    }

    static InsertArticle(body, token) {
        return fetchWithTimeout(`${baseUrl}/api/articles/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        })
        .then(handleResponse)
        .catch(error => {
            console.error('Error inserting article:', error);
            throw error;
        });
    }

    static DeleteArticle(article_id, token) {
        return fetchWithTimeout(`${baseUrl}/api/articles/${article_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(handleResponse)
        .catch(error => {
            console.error('Error deleting article:', error);
            throw error;
        });
    }

    static LoginUser(body) {
        return fetchWithTimeout(`${baseUrl}/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(handleResponse)
        .catch(error => {
            console.error('Error logging in:', error);
            throw error;
        });
    }

    static RegisterUser(body) {
        return fetchWithTimeout(`${baseUrl}/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(handleResponse)
        .catch(error => {
            console.error('Error registering user:', error);
            throw error;
        });
    }
}