import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import APIService from './APIService';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useCookies(['mytoken']);
    const [isLogin, setLogin] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = token['mytoken'];
        console.log('Login User token is', userToken);
        console.log('Data type', typeof userToken);

        if (userToken) {
            navigate('/articles');
        } 
    }, [token, navigate]);  // ✅ Added navigate to dependencies

    const loginBtn = () => {
        if (username.trim() && password.trim()) {
            console.log('Username and Password are set');
            APIService.LoginUser({ username, password })
                .then(resp => setToken('mytoken', resp.token))
                .catch(error => console.log('Login Error:', error));
        } else {
            console.log('Username and Password are not set');
        }
    };

    const RegisterBtn = () => {
        if (username.trim() && password.trim()) {
            console.log('Username and password are set');
            APIService.RegisterUser({ username, password })
                .then(() => loginBtn())  // ✅ Now correctly calls loginBtn
                .catch(error => console.log('Register Error:', error));
        } else {
            console.log('Username and password are not set');
        }
    };

    const loginStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL + "/img/18.jpg"})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100%',  // ✅ Fixed JSX style
        height: '77vh',
        backgroundPosition: 'center',
        margin: 0,
    };

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row">
                    <h1 className="alert alert-danger">Welcome to Blog</h1>
                    <br /><br />

                    <div className="col-sm-4">
                        {isLogin ? <h3>Please Login Here</h3> : <h3>Please Register Here</h3>}    
                        
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                value={username}
                                className="form-control"
                                placeholder="Enter Username"
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                value={password}
                                className="form-control"
                                placeholder="Enter Password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <br />

                        <div>
                            {isLogin ? (
                                <div>
                                    <button onClick={loginBtn} className="btn btn-primary">Login</button>
                                    <p>If you don't have an account, please</p>
                                    <button onClick={() => setLogin(false)} className="btn btn-primary">Register</button>
                                </div>
                            ) : (
                                <div>
                                    <button onClick={RegisterBtn} className="btn btn-primary">Register</button>
                                    <p>If you have an account, please</p>
                                    <button className="btn btn-primary" onClick={() => setLogin(true)}>Login</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-sm-8 full-img" style={loginStyle}></div>
                </div>
            </div>
        </div>
    );
}

export default Login;
