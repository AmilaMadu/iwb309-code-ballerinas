// import React, { useState } from 'react'

// const Login = () => {

//   const [state,setState] = useState('Sign Up')
  
//   const [email,setEmail] = useState('')
//   const [password,setPassword] = useState('')
//   const [name,setName] = useState('')

//   const onSubmitHandler = async (event) => {
//       console.log(name,email,password);

//       const submitOrderUrl = "http://localhost:9090";
//       try {
//         const response = await postAPI(submitOrderUrl, { date: createdDate(), item, customerId: customer, status: 'PENDING', cargoId: "Not Assigned", id: createID(), quantity: parseInt(quantity) });
//         if (response.error) {
//           setError(true);
//           console.log(response.error)
//         } else {
//           setError(null);
//           router.push('/');
//         }
//       } catch (err) {
//         console.log(err)
//         helpers.setStatus({ success: false });
//         helpers.setErrors({ submit: err.message });
//         helpers.setSubmitting(false);
//       }

//       event.preventDefault()

      
//   }

//   return (
//     <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
//       <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
//         <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
//         <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>
//         {
//           state === "Sign Up" && <div className='w-full'>
//             <p>Full Name</p>
//             <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=> setName(e.target.value)} value={name} required/>
//           </div>
//         }

//         <div className='w-full'>
//           <p>Email</p>
//           <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=> setEmail(e.target.value)} value={email} required/>
//         </div>

//         <div className='w-full'>
//           <p>Password</p>
//           <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=> setPassword(e.target.value)} value={password} required />
//         </div> 
//         <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>     
//         {
//           state === "Sign Up"
//           ? <p>Already have an account? <span onClick={()=> setState('Login')} className='text-primary underline cursor-pointer'>Login here</span> </p>
//           : <p>Create an new account? <span onClick={()=> setState('Sign Up')} className='text-primary underline cursor-pointer'>click here</span> </p>
//         }
//       </div>

//     </form>
//   )
// }

// export default Login
import React, { useState } from 'react';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

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
      if (response.ok) {
        setMessage(data.message);
        if (state === 'Login') {
          setUser(data.user);
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
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>
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