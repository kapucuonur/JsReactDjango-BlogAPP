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
        const { mytoken } = token;
        console.log('Login User token is', mytoken);
        console.log('Data type', typeof mytoken);

        if (String(mytoken) === 'undefined') {
            navigate('/');
        } else {
            navigate('/articles');
        }
    }, [token, navigate]);

    const validateInputs = () => {
        return username.trim().length !== 0 && password.trim().length !== 0;
    };

    const loginBtn = () => {
        if (validateInputs()) {
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
        if (validateInputs()) {
            console.log('Username and password are set');
            APIService.RegisterUser({ username, password })
                .then(() => loginBtn())
                .catch((error) => console.log(error));
        } else {
            navigate('/');
            console.log('Username and password are not set');
        }
    };

    const styles = {
        background: {
            backgroundImage: `url(${PUBLIC_URL + "img/10.jpg"})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        formContainer: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
        },
        input: {
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #ced4da',
            borderRadius: '5px',
            fontSize: '1rem',
        },
        button: {
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#007bff',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: '1rem',
        },
        toggleButton: {
            backgroundColor: 'transparent',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
            textDecoration: 'underline',
        },
    };

    return (
        <div style={styles.background}>
            <div style={styles.formContainer}>
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
                        style={styles.input}
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
                        style={styles.input}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    {isLogin ? (
                        <div>
                            <button onClick={loginBtn} style={styles.button}>
                                Login
                            </button>
                            <p className="text-center" style={{ marginTop: '1rem' }}>
                                Don't have an account?{' '}
                                <button onClick={() => setLogin(false)} style={styles.toggleButton}>
                                    Register
                                </button>
                            </p>
                        </div>
                    ) : (
                        <div>
                            <button onClick={RegisterBtn} style={styles.button}>
                                Register
                            </button>
                            <p className="text-center" style={{ marginTop: '1rem' }}>
                                Already have an account?{' '}
                                <button onClick={() => setLogin(true)} style={styles.toggleButton}>
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