import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../Context/CartContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const AuthCtx = useContext(AuthenticationContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setFeedback({ message: '', type: '' });
  };

  const handleFeedback = (message, type = 'error') => {
    setFeedback({ message, type });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:${
          isLogin ? 'signInWithPassword' : 'signUp'
        }?key=AIzaSyCJPMq08vsmSHC0N9m8Knd-IlEsJP-X7KQ`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log('idToken:', responseData.idToken);
        AuthCtx.login(responseData.idToken);
        localStorage.setItem('email', email);
        handleFeedback(`${isLogin ? 'Login' : 'Registration'} successful`, 'success');
        navigate('/store');
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
    <section className="container mt-5 d-flex justify-content-center align-items-center">
      <form onSubmit={submitHandler}>
        <h1 className='text-center'>{isLogin ? 'Login' : 'Sign Up'}</h1>
        {feedback.message && (
          <p className={`alert ${feedback.type === 'error' ? 'alert-danger' : 'alert-success'}`}>
            {feedback.message}
          </p>
        )}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Your Email
          </label>
          <input type="email" className="form-control" id="email" required ref={emailRef} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Your Password
          </label>
          <input type="password" className="form-control" id="password" required ref={passwordRef} />
        </div>
        <div className="mb-3">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <button type="submit" className="btn btn-primary">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          )}
        </div>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with an existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
