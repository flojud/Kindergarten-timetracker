import React, { useContext, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/User";
import { UserContext } from "../contexts/AuthContextProvider";

const Login = () => {
  
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [user, setUser] = useState<IUser>();


  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider()).then(response => {
      console.log(response.user);
      setUser(response.user as IUser);
      navigate('/profile')
    }).catch(error => {
      console.log(error);
      setAuthing(false);
    })
  }


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const userAuth = useContext(UserContext);
  
  const handlsignInWithEmail = async (e: any) => {
    e.preventDefault();
    setError('');
    try {
      await userAuth.signIn(email, password);
      navigate('/profile');
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
    }
  };
  
  return <>
  <div>
    <p>Login Page</p>
    <div>Login with Google:</div>
    <button onClick={signInWithGoogle} disabled={authing}>Sign in with Google</button>
    <div>Login with Email:</div>

    <form onSubmit={handlsignInWithEmail}>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className='border p-3'
            type='email'
          />
        </div>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className='border p-3'
            type='password'
          />
        </div>
        <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
          Sign Up
        </button>
      </form>

  </div>
  </>
}

export default Login;