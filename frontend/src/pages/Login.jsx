import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AppContext } from '../Contexts/AppContext'
import { useContext } from 'react';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const {user_id, setUserId} = useContext(AppContext)
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    const url = state === 'Sign Up' ? 'http://localhost:9090/backend/users' : 'http://localhost:9090/backend/login';
    const userData = { email, password, ...(state === 'Sign Up' && { name }) };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      console.log('Login API response:', data.user);  // Debugging log
      if (data.message != 'Invalid email or password') {

        setMessage(data.message);
        setUserId(data.user);
        localStorage.setItem('user_id', data.user);
        
        if (state === 'Sign Up') {
          // Switch to login form after successful sign-up
          setState('Login');
          setMessage('Sign-up successful! Please log in.');
          } else if (state === 'Login') {
          setUser(data.user);
          navigate('/doctors');
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
          // You can add redirection or other actions after successful login
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
    }
  };
  
  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              type='text'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>
        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{' '}
            <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>
              Click here
            </span>
          </p>
        )}
        {message && <p>{message}</p>}
        {user && (
          <div>
            {/*<h3>User Details</h3>
            <p>Email: {user.email}</p>
            <p>Name: {user.name}</p>*/}
          </div>
        )}
      </div>
    </form>
  );
};

export default Login;
