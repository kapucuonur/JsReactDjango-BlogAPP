import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import APIService from './APIService';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useCookies(['mytoken']);
    let navigate = useNavigate();
    const [isLogin, setLogin] = useState(true);

    useEffect(() => {
        var user_token = token['mytoken'];
        console.log('Login User token is', user_token);
        console.log('Data type', typeof token['mytoken']);

        if (String(user_token) === 'undefined') {
            navigate('/');
        } else {
            navigate('/articles');
        }
    }, [token]);

    const loginBtn = () => {
        if (username.trim().length !== 0 && password.trim().length) {
            console.log('Username And Password Are Set');
            APIService.LoginUser({ username, password })
                .then((resp) => setToken('mytoken', resp.token))
                .catch((error) => console.log(error));
        } else {
            console.log('Username And Password Are Not Set');
            navigate('/');
        }
    };

    const RegisterBtn = () => {
        if (username.trim().length !== 0 && password.trim().length !== 0) {
            console.log('Username and password are set');
            APIService.RegisterUser({ username, password })
                .then(() => loginBtn())
                .catch((error) => console.log(error));
        } else {
            navigate('/');
            console.log('Username and password are not set');
        }
    };

    // Background image style
    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/frontend/src/')`, // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    // Form container style
    const formContainerStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    };

    // Input style
    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        marginBottom: '1rem',
        border: '1px solid #ced4da',
        borderRadius: '5px',
        fontSize: '1rem',
    };

    // Button style
    const buttonStyle = {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginBottom: '1rem',
    };

    // Toggle button style
    const toggleButtonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#007bff',
        cursor: 'pointer',
        textDecoration: 'underline',
    };

    return (
        <div style={backgroundStyle}>
            <div style={formContainerStyle}>
                <h1 className="text-center mb-4" style={{ color: '#343a40' }}>
                    {isLogin ? 'Login' : 'Register'}
                </h1>
                <div className="form-group">
                    <label htmlFor="username" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        style={inputStyle}
                        placeholder="Enter Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        style={inputStyle}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    {isLogin ? (
                        <div>
                            <button onClick={loginBtn} style={buttonStyle}>
                                Login
                            </button>
                            <p className="text-center" style={{ marginTop: '1rem' }}>
                                Don't have an account?{' '}
                                <button onClick={() => setLogin(false)} style={toggleButtonStyle}>
                                    Register
                                </button>
                            </p>
                        </div>
                    ) : (
                        <div>
                            <button onClick={RegisterBtn} style={buttonStyle}>
                                Register
                            </button>
                            <p className="text-center" style={{ marginTop: '1rem' }}>
                                Already have an account?{' '}
                                <button onClick={() => setLogin(true)} style={toggleButtonStyle}>
                                    Login
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;