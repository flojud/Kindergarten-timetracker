import React from "react";
import { getAuth, signOut } from "firebase/auth";

const Home = () => {
  const auth = getAuth();
  return(
  <>
    <div>
      <p>Home Page</p>
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  </>)
}

export default Home;