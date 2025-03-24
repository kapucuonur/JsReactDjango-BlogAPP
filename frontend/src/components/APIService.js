export default class APISerive {
    static UpdateArticle(article_id,body,token){
        return fetch(`https://jsreactdjango-blogapp.onrender.com/api/articles/${article_id}/`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body:JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static InsertArticle(body,token){
        return fetch(`https://jsreactdjango-blogapp.onrender.com/api/articles/`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body:JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static DeleteArticle(article_id,token){
        return fetch(`https://jsreactdjango-blogapp.onrender.com/api/articles/${article_id}/`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
    }


    static LoginUser(body) {
        return fetch(`https://jsreactdjango-blogapp.onrender.com/auth/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
          .then((resp) => {
            if (!resp.ok) {
              // Handle HTTP errors (e.g., 400, 401, 500, etc.)
              return resp.text().then((text) => {
                throw new Error(`Server error: ${resp.status} - ${text}`);
              });
            }
            return resp.json(); // Parse the JSON response
          })
          .then((data) => {
            // Handle successful response
            console.log('Login successful:', data);
            return data;
          })
          .catch((error) => {
            // Handle network errors or other issues
            console.error('Login failed:', error);
            throw error; // Re-throw the error for the caller to handle
          });
      }



    static RegisterUser(body){
        return fetch(`https://jsreactdjango-blogapp.onrender.com/api/users/`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(body)
        }).then(resp => resp.json())
    }    

    

}