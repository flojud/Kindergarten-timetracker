import React, { createContext, useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/User";



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
      navigate('/')
    }).catch(error => {
      console.log(error);
      setAuthing(false);
    })
  }

  
  return <>
  <div>
    <p>Login Page</p>
    <button onClick={signInWithGoogle} disabled={authing}>Sign in with Google</button>
  </div>
  </>
}

export default Login;