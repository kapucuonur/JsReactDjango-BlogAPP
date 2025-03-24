import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import APIService from './APIService';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useCookies(['mytoken']);
    const navigate = useNavigate();
    const [isLogin, setLogin] = useState(true);

    useEffect(() => {
        const userToken = token['mytoken']; // Get token value

        if (userToken) { // Check if token exists (simpler condition)
            navigate('/articles');
        } else {
            navigate('/'); // Or wherever you want to redirect if not logged in
        }
    }, [token, navigate]);

    const loginBtn = () => {
        if (username.trim() !== '' && password.trim() !== '') {
            APIService.LoginUser({ username, password })
                .then(resp => {
                    setToken('mytoken', resp.token); // Set token after successful login
                    navigate('/articles'); // Redirect to articles after login
                })
                .catch(error => console.log(error));
        } else {
            console.log('Username and password are required.');
            // Optionally display an error message to the user
        }
    };


    const RegisterBtn = () => {
        if(username.trim().length !== 0 && password.trim().length !== 0){
            console.log('Username and password are set');
            APIService.RegisterUser({username, password})
            .then(() => loginBtn())
            .catch(error => console(error))
        }else{
            navigate('/')
            console.log('Username and password are not set');

        }
    }


    const loginStyle={
        backgroundImage:`url(${process.env.PUBLIC_URL+ "img/10.jpg"})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                'minHeight': '100%',
                height:'77vh',
                backgroundPosition:' center',
                margin:0,
            
                };


    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row">
                <h1 className="alert alert-danger">Welcome to Blog</h1>
                <br />
                <br />

                <div className="col-sm-4">
                    {isLogin ? <h3>Please Login Here</h3> : <h3>Please Register Here</h3>}    
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                <input type="text" value={username} className="form-control" placeholder="Enter Username" onChange ={e=> setUsername(e.target.value)}/>
            </div>

  
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                <input type="password" value={password} className="form-control" placeholder="Enter Password" onChange ={e=> setPassword(e.target.value)}/>
            </div>

            <br />

            <div>
            {isLogin ? 
            <div>
                <button onClick={loginBtn} className="btn btn-primary">Login</button>
                <p>If You Don't Have Account, Please</p><button onClick={() => setLogin(false)} className="btn btn-primary">Register</button></div> 
            :
            <div>
                <button onClick={RegisterBtn} className="btn btn-primary">Register</button>
<p>If You Have Account, Please <button className="btn btn-primary" onClick={() => setLogin(true)}>Login</button></p></div>
            }
            </div>
            </div>


            <div className="col-sm-8 full-img" style={loginStyle}>

            </div>

                </div>
                </div>
            </div>
    )
}

export default Login
