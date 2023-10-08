import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Correct import statement
import classes from './LoginPage.module.css';
import { AuthenticationContext } from '../Context/CartContext';

const LoginPage = () => {
  const navigate = useNavigate();  // Initialize useNavigate
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  
  const AuthCtx = useContext(AuthenticationContext);

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
    setFeedback({ message: '', type: '' });
  };

  const handleFeedback = (message, type = 'error') => {
    setFeedback({ message, type });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    setIsLoading(true);

    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${isLogin ? 'signInWithPassword' : 'signUp'}?key=AIzaSyCJPMq08vsmSHC0N9m8Knd-IlEsJP-X7KQ`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('idToken:', responseData.idToken);
        AuthCtx.login(responseData.idToken);
        handleFeedback(`${isLogin ? 'Login' : 'Registration'} successful`, 'success');
        navigate('/store');  // Use navigate function to redirect
      } else {
        handleFeedback(responseData.error.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('An error occurred during authentication', error);
      handleFeedback('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      {feedback.message && (
        <p className={`${feedback.type === 'error' ? classes.error : classes.success}`}>
          {feedback.message}
        </p>
      )}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <button type='submit' className={classes.account}>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          )}
        </div>
        <div className={classes.actions}>
          <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with an existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
