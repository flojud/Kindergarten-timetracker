import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const Home = () => {
  const auth = getAuth();
  return(
  <>
    <div>
      <div>Home Page</div>
      <div><Link to={"/profile"} >My Profile</Link></div>
      <div><button onClick={() => signOut(auth)}>Logout</button></div>
    </div>
  </>)
}

export default Home;