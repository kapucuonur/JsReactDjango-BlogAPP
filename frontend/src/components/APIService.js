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
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
    }


    static LoginUser(body){
        return fetch(`https://jsreactdjango-blogapp.onrender.com/auth/`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        }).then(resp => resp.json())
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